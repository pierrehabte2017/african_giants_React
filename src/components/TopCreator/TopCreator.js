import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import {db} from "../../firestore"
import classes from "./TopCreator.css"

import {Link} from "react-router-dom";


class TopCreator extends Component {

  state = {
     topAuthors: [],
  }

  componentDidMount (){
    if (this.props.categoryId) {
      
      let listAuthors=[]

      // or get the single doc from the collection
      if (this.props.categoryName==="all"){
        db.collection("authors")
        .limit(30)
        .get()
        .then( querySnapshot => {
            listAuthors = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    authorId: doc.id 
                }
            })
          const selectedAuthors = shuffleArray(listAuthors, 13)
          this.setState({topAuthors: selectedAuthors})
        
            
        })
      } else {
        db.collection("authors")
        .where("categoryId", "==", this.props.categoryId)
        .limit(25)
        .get()
        .then( querySnapshot => {
            listAuthors = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    authorId: doc.id 
                }
            })
          const selectedAuthors = shuffleArray(listAuthors, 7)
          this.setState({topAuthors: selectedAuthors})
        
            
        })

    }
    
  }

}


    
    render () {
        return (
            <div className={classes.Wrapper}>
              
                <div className={classes.Title}>
                {this.props.text}
                <div className={classes.TopCreatorWrapper}>
                  
                  {this.state.topAuthors.map(author =>(
            
                    <Link to={"/author/"+author.authorId} className={classes.AuthorElement}>

                      <img src={author.profileImage} className={classes.AuthorImage}/>
                      <div className={classes.AuthorClaps}>
                        {giveNumberClaps(author.numberLikes) + " 👏"}
                      </div>
                      <div className={classes.AuthorName}>
                        {author.name}
                      </div>
                      

                    </Link>))
                  }

                </div>
                </div>
                
            </div>

            
    
        );
    }

}

const shuffleArray = (array, n) =>{
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected= shuffled.slice(0, n);
  return selected
}


const mapStateToProps = state => {
    return {
        contents: state.contents,
        loadingContents: state.loadingContents,
        categories: state.categories,
        contentsCached: state.contentsCached,
        lastScores: state.lastScores,
    

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        onClapContent: (contentId, categoryId, numberLikes) => dispatch(actions.clapContent(contentId, categoryId, numberLikes))
    };
  };


  const giveNumberClaps = number => {

    if (number<1000){
        return number.toString()
    }
    if (number>1000){
        let p=number/1000
        return p.toFixed(1).toString()+"K"
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopCreator);