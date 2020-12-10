import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import FeedElement from "../../components/FeedElement/FeedElement"
import classes from "./AuthorPage.css"
import * as actions from "../../store/actions/index"
import backButtonImage from "../../assets/images/backButton.svg"
import facebookImage from "../../assets/images/facebook.png"
import instagramImage from "../../assets/images/instagram.jpg"
import tiktokImage from "../../assets/images/tiktok.svg"
import twitterImage from "../../assets/images/twitter.png"
import youtubeImage from "../../assets/images/youtube.svg"
import {db} from "../../firestore"
import VisibilitySensor from 'react-visibility-sensor'
import translations from "../../translations"

class AuthorPage extends Component  {

    state = {info: null,
            contentsAuthor:[],
            feed:"latest",
            contentLatest:null,
            contentPopular:null,
            authorId:this.props.history.location.pathname.split("author/")[1],
            lastCreatedAt: null,
            lastNumberLikes:null,
            moreContent: true,


    }

    componentDidMount (){
        const authorId  = this.state.authorId

        db.collection("authors")
        .doc(authorId)
        .get()
        .then(doc => {
            const author = {
                ...doc.data(),
                authorId: doc.id
            }
            this.setState({info: author})

            //get latest contents author
            db.collection("contents")
            .where("authorId", "==", author['authorId'])
            .orderBy("createdAt","desc")
            .limit(10)
            .get()
            .then(querySnapshot => {
                const listContent = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        contentId: doc.id  
                    }})
                this.setState({contentLatest: listContent, 
                    lastCreatedAt: listContent[listContent.length-1]['createdAt']})

            })
        })
    

    }

    clickHandlerPopular(){
        
        //get latest contents author
        db.collection("contents")
        .where("authorId", "==", this.state.authorId)
        .orderBy("numberLikes","desc")
        .limit(10)
        .get()
        .then(querySnapshot => {
            const listContent = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    contentId: doc.id  
                }})
                this.setState({contentPopular: listContent,
                    feed:"popular",
                    lastNumberLikes: listContent[listContent.length-1]['numberLikes']}) 
        })
    
    }

    clickHandlerLatest(){
        this.setState({feed:"latest"})
    }

    onChange (isVisible) {
        
        //get more latest contents author
        if (isVisible && this.state.feed==="latest"){
            db.collection("contents")
            .where("authorId", "==", this.state.authorId)
            .orderBy("createdAt","desc")
            .startAfter(this.state.lastCreatedAt)
            .limit(10)
            .get()
            .then(querySnapshot => {
                const listContent = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        contentId: doc.id  
                    }})
                    if (listContent.length){
                        let newListContentLatest = this.state.contentLatest
                        this.setState({contentLatest: newListContentLatest.concat(listContent),
                            feed:"latest",
                            lastCreatedAt: listContent[listContent.length-1]['createdAt']
                            }) 
                    } else {
                
                        this.setState({moreContent:false})
                    }
            })
        }

        //get more popular contents author
        if (isVisible && this.state.feed==="popular"){
            db.collection("contents")
            .where("authorId", "==", this.state.authorId)
            .orderBy("numberLikes","desc")
            .startAfter(this.state.lastNumberLikes)
            .limit(10)
            .get()
            .then(querySnapshot => {
                const listContent = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        contentId: doc.id  
                    }})
                    if (listContent.length){
                        let newListContentPopular = this.state.contentPopular
                        this.setState({contentPopular: newListContentPopular.concat(listContent),
                            feed:"popular",
                            lastNumberLikes: listContent[listContent.length-1]['numberLikes']
                            }) 
                    } else {
                        this.setState({moreContent:false})
                    }
            })
        }
      }
    

    render () {
        //active feed
        let styleLatest = {borderBottom: "0.6px solid rgba(192,192,192,0.9)",
                    color: "rgba(150,150,150,0.9)"  }
        let stylePopular = {borderBottom: "0.6px solid rgba(192,192,192,0.9)",
                    color: "rgba(150,150,150,0.9)"  }

        if (this.state.feed ==="latest"){
            styleLatest={borderBottom: "1.5px solid rgba(21,174,8,0.7)", color: "rgba(21, 174, 8, 1)" }
        }else{
            stylePopular={borderBottom: "1.5px solid rgba(21,174,8,0.7)",color: "rgba(21, 174, 8, 1)" }
        }

        let contentDisplay=[]

        if(this.state.contentLatest && this.state.feed==="latest"){
            contentDisplay = this.state.contentLatest
        }
        if(this.state.contentPopular && this.state.feed==="popular"){
            contentDisplay = this.state.contentPopular
        }
        //start rendering
        
        return (
        <div>
            {this.state.info != null ?
            <div className={classes.Background}>
                <div className={classes.AuthorWrapper}>

                    <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
                        <img src={backButtonImage} className={classes.backButtonImage} alt="back button"/>
                        Back 
                    </div>
                    <img src={this.state.info.profileImage}
                        className={classes.AuthorProfilImage}
                        alt={this.state.info.name} />
                    
                    <h1 className={classes.AuthorName} >
                        {this.state.info.name}
                    </h1>
                    <meta name="description" content={this.state.info.description}/>

                    
                    <div className={classes.AuthorDescription} >
                        {this.state.info.description}
                    </div>

                    <div className={classes.Metrics}>

                    
                        <div className={classes.NumberLikes}>
                            <div className={classes.MetricTitle}>
                                {translations.claps[this.props.language]}
                            </div>
                            <div className={classes.MetricNumber}>
                                {giveNumberClaps(this.state.info.numberLikes)}
                            </div>
                        </div>

                        <div className={classes.NumberShares}>
                            <div className={classes.MetricTitle}>
                                {translations.shares[this.props.language]}
                            </div>
                            <div className={classes.MetricNumber}>
                                {giveNumberClaps(computeShares(this.state.info.numberLikes))}
                            </div>
                        </div>

                        <div className={classes.SocialLinks}>
                            <div className={classes.MetricTitle}>
                            {translations.social_link[this.props.language]}
                            </div >
                            <div className={classes.SocialLinksImages}>
                                {Object.keys(this.state.info.socialLinks).includes("YOUTUBE")? 
                                 <a  href={this.state.info.socialLinks["YOUTUBE"]}><img src={youtubeImage} className={classes.SocialLinksImage} alt=""/></a>:null}
                                 {Object.keys(this.state.info.socialLinks).includes("FACEBOOK")? 
                                 <a  href={this.state.info.socialLinks["FACEBOOK"]}><img src={facebookImage} className={classes.SocialLinksImage} alt=""/></a>:null}
                                 {Object.keys(this.state.info.socialLinks).includes("TIKTOK")? 
                                 <a  href={this.state.info.socialLinks["TIKTOK"]}><img src={tiktokImage} className={classes.SocialLinksImage} alt=""/></a>:null}
                                 {Object.keys(this.state.info.socialLinks).includes("INSTAGRAM")? 
                                 <a  href={this.state.info.socialLinks["INSTAGRAM"]}><img src={instagramImage} className={classes.SocialLinksImage} alt=""/></a>:null}
                                 {Object.keys(this.state.info.socialLinks).includes("TWITTER")? 
                                 <a  href={this.state.info.socialLinks["TWITTER"]}><img src={twitterImage} className={classes.SocialLinksImage} alt=""/></a>:null}
                            </div>
                        </div>

                        

                    </div>

                    <div className={classes.Titles}>
                        <div className={classes.TitleLatest} style={styleLatest} onClick={() => this.clickHandlerLatest()}>
                            {translations.latest[this.props.language]}
                        </div>
                        <div className={classes.TitlePopular} style={stylePopular} onClick={() => this.clickHandlerPopular()} >
                        {translations.popular[this.props.language]}
                        </div>
                    </div>

                    <div className={classes.Contents}>
                    {contentDisplay.map(content => (
                            <FeedElement categoryId={content.categoryId} 
                                            image={content.imageUrl}
                                            key={content.contentId}
                                            title={content.title}
                                            numberLikes={content.numberLikes}
                                            author={content.author}
                                            createdAt={content.createdAt}
                                            type={content.type}
                                            contentId={content.contentId}
                                            contentUrl={content.contentUrl}
                                            authorId={content.authorId}/>
                            ) )}
                    </div>
            
            
            </div>
            
            {contentDisplay.length>0? 
                <VisibilitySensor onChange={(visible) => this.onChange(visible)} className={classes.LoadMoreContent} >
                        <div className={classes.Loader}> {this.state.moreContent? "Load more ..." : "that's all!" }</div>
                </VisibilitySensor>: null}

            </div>:null}


        </div>

        
        );
        
    };
  
}

const computeShares = numberLikes =>{
    return Math.floor(numberLikes *1/5)
}

const giveNumberClaps = number => {

    if (number<1000){
        return number.toString()
    }
    if (number>1000){
        let p=number/1000
        return p.toFixed(1).toString()+"K"
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
      onGetCategories: (categories) => dispatch(actions.getCategories(categories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthorPage));
