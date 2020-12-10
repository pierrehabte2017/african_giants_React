import React, { Component} from 'react';
import classes from "./DiscoverCreators.css"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import Loader from "../../components/Loader/Loader"
import TextWrapper from "../../components/TextWrapper/TextWrapper"
import {
    Link,
    withRouter,
  } from "react-router-dom";

import translations from "../../translations"

class DiscoverCreators extends Component {

    cutDescription(description) {
        const size = 120
        if (description.length <size){
            return description
        } else{
            return description.substring(0,size-3).concat("...")
        }     
        
    }

    componentDidMount (){
        console.log("🧨start getting authors")
        this.props.onGetAuthors(this.props.authorsCached, this.props.authorsFeatured)
        this.props.onGetCategories(this.props.categories);
    }

    render () {
   

       
        return (
            <div>
                { this.props.authorsCached && this.props.authorsFeatured ? 

                <div className={classes.DiscoverWrapper}>
                    <div className={classes.TitleDiscover}> 
                        <TextWrapper styleFont="bold">{translations.featured_creators[this.props.language]} </TextWrapper>
                    </div>

                    <div className={classes.Carrousel}>
                        {this.props.authorsFeatured.map(author =>(
                            <Link to={"author/"+author.authorId} key={author.authorId} className={classes.AuthorFeaturedElement}>
                                
                                    <img src={author.profileImage} className={classes.AuthorImage}/>
                                
                                <div className={classes.AuthorLikes} > {author.numberLikes + "👏"} </div>
                                <div className={classes.AuthorName} > {author.name} </div>
                                <div className={classes.AuthorDescription} > {this.cutDescription(author.description)} </div>

                                </Link>

                        ))}
                    </div>

                    
                    <div className={classes.CategoriesWrapper}>

                        {this.props.categories.map(cat =>(

                            <div key={cat.categoryId}>
                                { cat.name !== "all"?
                                    <div className={classes.WrapperSingleCategory}>
                                        <div className={classes.TitleCategory}> 
                                                <TextWrapper styleFont="bold"> {translations.top_in[this.props.language]+ cat.representation[this.props.language] } </TextWrapper>
                                        </div>

                                        <div className={classes.CarrouselCategory}>
                                            
                                            {this.props.authorsCached[cat.categoryId].map(author => (

                                                <div key={author.authorId} className={classes.ElementAuthorCategory}>
                                                    <Link to={"author/"+author.authorId}>
                                                        <img src={author.profileImage} className={classes.ElementAuthorImage}/>
                                                    </Link>
                                                    <div className={classes.ElementAuthorLikes} >
                                                        {author.numberLikes + "👏"}
                                                    </div>
                                                    <div className={classes.ElementAuthorName} >
                                                        {author.name}
                                                    </div>
                                                </div>
                                                )

                                            )}
                                        </div>

                                    </div> :null}



                            </div>

                        )

                        )}
                        
                    </div>

                
                    
                </div>

                :<Loader/>}
            </div>
           
            );

}

}




const mapStateToProps = state => {
    return {
       authorsCached: state.authorsCached,
       authorsFeatured: state.authorsFeatured,
       categories: state.categories,
       language: state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetAuthors: (authorsCached, authorsFeatured) => dispatch(actions.getAuthors(authorsCached, authorsFeatured)),
        onGetCategories: (categories) => dispatch(actions.getCategories(categories))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DiscoverCreators));