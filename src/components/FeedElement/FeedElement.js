import React, { Component } from 'react';
import classes from "./FeedElement.css"
import ReactTimeAgo from 'react-time-ago'
import shareImage from "../../assets/images/share.svg"
import clapImage from "../../assets/images/clap.svg"
import youtubeImage from "../../assets/images/youtube.svg"
import tiktokImage from "../../assets/images/tiktok.svg"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import {db, increment} from "../../firestore"
import { useMediaQuery } from 'react-responsive'

import {Link} from "react-router-dom";

const giveNumberClaps = number => {

    if (number<1000){
        return number.toString()
    }
    if (number>1000){
        let p=number/1000
        return p.toFixed(1).toString()+"K"
    }  
}

const giveTitle = title =>{
    const size = 85
    if (title.length <size){
        return title
    }
    else{
        return title.substring(0,size)+"..."

    }
}

class FeedElement extends Component {

    state = {
        numberLikes:this.props.numberLikes,
        updatingLikes: false,
        width: window.innerWidth,
        height: window.innerHeight
    }

    clapHandler = (e) => {
        e.preventDefault();
        //vibration effect on some phones
        if (window.navigator.vibrate){
            window.navigator.vibrate(200)
        }
        this.setState({updatingLikes:true})
        // Document reference
        const contentref = db.collection('contents').doc(this.props.contentId);
        const authorRef = db.collection('authors').doc(this.props.authorId);

        // Update read count
        contentref.update({ numberLikes: increment }).then(res =>{
            let newNumberLikes = this.state.numberLikes+1
            this.setState({updatingLikes:false, numberLikes:newNumberLikes })
            this.props.onClapContent(this.props.contentId, this.props.categoryId, newNumberLikes)
            authorRef.update({ numberLikes: increment })
        })

    }
    
    

    shareHandler (e) {
        e.preventDefault();//  <------ Here is the magic
        this.props.onOpenShareModal("/videos/"+this.props.contentId, this.props.author, this.props.title, this.props.image );
    }



    
    render () {
        let imageType = this.props.type
        if (this.props.type === "YOUTUBE"){
            imageType=youtubeImage
        }
        if (this.props.type === "TIKTOK"){
            imageType=tiktokImage
        }

        // general element
        let styleElement = { height: "9.5em"}
        if (this.state.width>600){
            styleElement = {
                ...styleElement,
                height: "16em",
                marginLeft: "6%",
                marginRight: "6%",
            }
        }

        //title
        let styleTitle = { fontSize: "13px"}
        if (this.state.width>600){
            styleTitle = {
                ...styleTitle,
                fontSize:"25px"
                
            }
        }

        //author
        let styleAuthor = { fontSize: "12px"}
        if (this.state.width>600){
            styleAuthor= {
                ...styleAuthor,
                fontSize:"20px"
                
            }
        }

        //Date
        let styleDate = { fontSize:"8px"}
        if (this.state.width>600){
            styleDate= {
                ...styleDate,
                fontSize:"13px"
                
            }
        }



        return (
            <div>
            
                <div className={classes.FeedElement} style={styleElement}>
                    
                    <Link to={"/videos/"+this.props.contentId} className={classes.Content}>
                        
                        <div className={classes.MainImageWrapper} > 
                            <img className={classes.MainImage} src={this.props.image} alt={this.props.title}/>
                            <img className={classes.ImageType} src={imageType} alt={this.props.authorName}/>

                        </div>

                        <div className={classes.Description}>
                        
                            <div className={classes.Title} style={styleTitle}> 
                                {giveTitle(this.props.title)} 
                            </div>

                            {/* <div className={classes.ShareButton} onClickCapture={e => this.shareHandler(e)}>
                                <img className={classes.ShareButtonImage} src={shareImage} />
                                <div className={classes.ShareButtonText}>share</div>
                            </div> */}

                            <Link className={classes.Author}  style={styleAuthor}to={"/author/".concat(this.props.authorId)}> 
                                {this.props.author}
                            </Link>

                            <div className={classes.Date} style={styleDate}> 
                                <ReactTimeAgo date={this.props.createdAt}/>
                            </div>
                        
                            

                            <div className={classes.Reactions} onClick={(e) =>this.clapHandler(e)}>
                                <div className={classes.clapsIncrementWrapper}>
                                {this.state.updatingLikes? <div className={classes.clapsIncrement}> +1</div>: null}
                                </div>
                                <div className={classes.Claps}>
                                    <img src={clapImage} className={classes.ClapsImage}/>
                                    <div className={classes.NumberClaps}>{giveNumberClaps(this.state.numberLikes)}
                                    </div>
                                    
                                </div>

                            </div>

                        </div>

                    </Link>

                    

                </div>
  

            </div>
            
    
        );
    }

}


const mapStateToProps = state => {
    return {
        openedShareModal: state.openedShareModal

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        onClapContent: (contentId, categoryId, numberLikes) => dispatch(actions.clapContent(contentId, categoryId, numberLikes))
    };
  };




export default connect(mapStateToProps, mapDispatchToProps)(FeedElement);