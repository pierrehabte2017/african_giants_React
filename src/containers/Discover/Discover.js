import React, { Component} from 'react';
import classes from "./Discover.css"
import FeedElement from "../../components/FeedElement/FeedElement"
import TopCreator from "../../components/TopCreator/TopCreator"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import Loader from "../../components/Loader/Loader"
import VisibilitySensor from 'react-visibility-sensor'
import TextWrapper from "../../components/TextWrapper/TextWrapper"
import translations from "../../translations"

class Discover extends Component {

    state = {
        width: window.innerWidth,
       height: window.innerHeight
     }


    componentDidMount () {
        if (this.props.categoryId){
            this.props.onGetContents(this.props.categoryId, this.props.categoryName, this.props.contentsCached, this.props.lastScores)
      }
    }


    onChange (isVisible) {
       
        if (isVisible){
           
            this.props.onGetContents(this.props.categoryId, this.props.categoryName, this.props.contentsCached, this.props.lastScores)
          
        }
      }


    render () {
        //get the content

        let contents = this.props.contentsCached[this.props.categoryId]
        
        let styleTitle = { fontSize: "20px"}
       
    if (this.state.width>600){
        styleTitle = { 
        ...styleTitle,
        fontSize: "30px"}
    }
        console.log("this.props=",this.props)
        return (
            <div>
            
                    {this.props.categoryId && contents?<div>
                        <div className={classes.Title} style={styleTitle}> 
                        <TextWrapper styleFont="bold">{translations.trending[this.props.language]} {this.props.representation[this.props.language]} </TextWrapper>
                        </div>
                                    
                        <div className={classes.Feed}>
                            {contents.slice(0, 3).map(content => (
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
                            ) ) }

                            <TopCreator categoryId={this.props.categoryId} categoryName={this.props.categoryName} text={translations.creators[this.props.language]}/>

                            {contents.slice(3, contents.length-1).map(content => (
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
                            ) ) }


                            
                            {contents.length>0? 
                                <VisibilitySensor onChange={(visible) => this.onChange(visible)} className={classes.LoadMoreContent} >
                                    <div> Load more ... </div>
                                </VisibilitySensor>: null}
                        </div> 
                        
                    </div>: null}
                    {this.props.loadingContents?<Loader className={classes.Loader}/>:null}
                    
            
            </div>
           
            );

}

}




const mapStateToProps = state => {
    return {
        contents: state.contents,
        loadingContents: state.loadingContents,
        categories: state.categories,
        contentsCached: state.contentsCached,
        lastScores: state.lastScores,
        language:state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetContents: (categoryId, categoryNames, contentsCached, lastScores) => dispatch(actions.getContents(categoryId, categoryNames,contentsCached, lastScores))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Discover);