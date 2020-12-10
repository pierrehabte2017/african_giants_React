import React, { Component } from 'react';
import classes from "./DisplayPage.css"
import ReactTimeAgo from 'react-time-ago'
import shareImage from "../../assets/images/share.svg"
import clapImage from "../../assets/images/clap.svg"
import backButtonImage from "../../assets/images/backButton.svg"
import commentImage from "../../assets/images/comment.svg"
import RelatedContents from "../RelatedContents/RelatedContents"
import Loader from "../Loader/Loader"
import {db, increment} from "../../firestore"
import translations from "../../translations"

import {
    Link,
    withRouter,
  } from "react-router-dom";
  import * as actions from "../../store/actions/index"
import TextWrapper from "../TextWrapper/TextWrapper"
import { connect } from 'react-redux';

const giveNumberClaps = number => {

    if (number<1000){
        return number.toString()
    }
    if (number>1000){
        let p=number/1000
        return p.toFixed(1).toString()+"K"
    }

    
}

class DisplayPage extends Component {

    state = {
        info: null,
        textOpened: false,
        numberLikes:null,
        updatingLikes: false,
        imageAuthor:null,
        numberComments:null,
     
    }

   
    //give the right amount of description
    createMarkup(description) {
        const size = 90
        if (this.state.textOpened) {
            return {__html: description};
        }
        else {
            if (description.length <size){
                return {__html: description};
            } else {
                return {__html: description.substring(0,size-3).concat("...")};
            }
             
        }
        
      }

    opentext(){
        this.setState({textOpened:true})
    }
    closetext(){
        this.setState({textOpened:false})
    }

    clapHandler (){
        this.setState({updatingLikes:true})
        // Document reference
        const contentref = db.collection('contents').doc(this.state.contentId);
        const authorRef = db.collection('authors').doc(this.state.info.author);

        // Update read count
        contentref.update({ numberLikes: increment }).then(res =>{
            let newNumberLikes = this.state.numberLikes+1
            this.setState({updatingLikes:false, numberLikes:newNumberLikes })
            this.props.onClapContent(this.state.contentId, this.state.info.categoryId, newNumberLikes)
            authorRef.update({ numberLikes: increment })
        }).catch(error => {
            console.log(error)
        });
        

    }

    componentDidMount (){
        const contentId  = this.props.history.location.pathname.split("videos/")[1]
        console.log("contentId =",contentId )
        //compute number comment
        this.setState({numberComments: Math.floor(2+Math.random() * Math.floor(30)) })
        // or get the single doc from the collection
        db.collection("contents")
        .doc(contentId)
        .get()
        .then(doc => {
            const content = {
                ...doc.data(),
                contentId: doc.id
            }

            this.setState({info: content,
                        numberLikes:content['numberLikes'],
                        contentId:content["contentId"]
                    })
            //get image author:
            db.collection("authors")
            .doc(content['authorId'])
            .get()
            .then( doc => {
                this.setState({imageAuthor:doc.data()["profileImage"]})
            })
        })

    }

    commentHandler(){
        this.props.onOpenCommentModal()

    }

    render() {
        const width= window.innerWidth;
        const widthVideo = (width*0.99).toFixed(0)
        const heightVideo = (9*widthVideo /16).toFixed(0)
        let styleVideo={
            width:  widthVideo.toString()+"px",
            height: heightVideo.toString()+"px",
            left:"-5.5%"
        }
        let styleWrapper = {
            width: "90%",
            left: "5%"

        }

        let styleBackground = {

        }

        if (width>600){
            styleVideo={
                ...styleVideo,
                width:  0.8*widthVideo.toString()+"px",
                height: 0.8*heightVideo.toString()+"px",
                left:"0%"

            }

            styleWrapper= {
                ...styleWrapper,
                width: "80%",
                left: "10%"
            }

            styleBackground= {
                ...styleBackground,
                backgroundImage: "linear-gradient(rgba(21, 174, 8, 1), rgba(71, 211, 222, 0.01))"

            }

        }

        



        


        
        return (
            <div>
            {this.state.info != null ?<div className={classes.Background} style={styleBackground}>
            <div className={classes.VideoWrapper} style={styleWrapper}>
            
                <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
                    <img src={backButtonImage} className={classes.backButtonImage} alt=""/>
                    Back 
                </div>

        
                <iframe  className={classes.Video} 
                        src={this.state.info.contentUrl} 
                        title={this.state.info.title}
                        style={styleVideo}
                        allowfullscreen="allowfullscreen"
                        mozallowfullscreen="mozallowfullscreen" 
                        msallowfullscreen="msallowfullscreen" 
                        oallowfullscreen="oallowfullscreen" 
                        webkitallowfullscreen="webkitallowfullscreen"/>
                
                <div>
                <div className={classes.Share} onClick={()=>this.props.onOpenShareModal(this.props.history.location.pathname, this.state.info.author, this.state.info.title, this.state.info.imageUrl)}> 
                    <img src={shareImage} className={classes.ShareImage} alt =""/>
                    <div className={classes.ShareText}>share</div>
                </div>
                <img src={clapImage} className={classes.ClapImage} alt="" onClick={() =>this.clapHandler()}/>
                <div className={classes.NumberClaps}>
                    {giveNumberClaps(this.state.numberLikes)} 
                    {this.state.updatingLikes? <div className={classes.clapsIncrement}> +1</div>: null}
                </div>
                
                </div>

                <h1 className={classes.Title}>
                    {this.state.info.title}
                </h1>
                <ReactTimeAgo className={classes.Date} date={this.state.info.createdAt}/>

                <div className={classes.Description}>
                    <TextWrapper styleFont="bold" > 
                        <div className={classes.DescriptionTitle}> {translations.description[this.props.language]} </div>
                    </TextWrapper>

                    <meta name="keywords" content={this.state.info.title.replace(" ",", ")}/>
                    <meta name="description" content={this.state.info.description}/>
                    <meta name="author" content={this.state.info.author}/>
            
                    <div className={classes.DescriptionText}>
                        <div dangerouslySetInnerHTML={this.createMarkup(this.state.info.description)} />
                        {this.state.textOpened ? <div><div className={classes.DescriptionTextLess} onClick={this.closetext.bind(this)}> 
                                                    <div className={classes.textButtom}>{translations.less[this.props.language]}</div> 
                                                    </div >
                                                    <div className={classes.Space} ></div></div>: 
                                                <div  className={classes.DescriptionTextMore} onClick={this.opentext.bind(this)}>
                                                    <div className={classes.textButtom}> {translations.more[this.props.language]}</div>
                                                    </div >}
                    </div>

                </div>

                <div className={classes.Comments} onClick={()=> this.commentHandler()}>
                    <img src={commentImage} className={classes.CommentsImage}/>
                    <TextWrapper styleFont="bold"  className={classes.CommentsTitle}> 
                                {translations.comments[this.props.language]+"("+this.state.numberComments+")"}
                    </TextWrapper>

                </div>

                <Link to={"/author/"+this.state.info.authorId} className={classes.AuthorInfo}  >
                    <img src={this.state.imageAuthor} className={classes.AuthorImage}/>
                    <div className={classes.AuthorName}> 
                        {this.state.info.author}
                    </div>
                </Link>

            
            <RelatedContents authorId={this.state.info.authorId} text={translations.related_videos[this.props.language]}/>

            </div>
            
            </div> : <Loader/>}
            
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        categories: state.categories,
        loadingCategories: state.loadingCategories,
        language:state.language
        
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        onOpenCommentModal: () => dispatch(actions.openCommentModal()),
        onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        onClapContent: (contentId, categoryId, numberLikes) => dispatch(actions.clapContent(contentId, categoryId, numberLikes))
    };
  };
  

  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DisplayPage));