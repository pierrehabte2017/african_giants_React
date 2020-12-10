import React, { Component } from 'react';
import classes from "./RelatedContents.css"
import Loader from "../Loader/Loader"
import {db} from "../../firestore"
import TextWrapper from "../TextWrapper/TextWrapper"
import {Link} from "react-router-dom";
import {withRouter,useHistory} from 'react-router';
  

const giveTitle = title =>{
    const size = 50
    if (title.length <size){
        return title
    }
    else{
        return title.substring(0,size)+"..."

    }
}

class RelatedContents extends Component {

    state = {
        loading:true,
        contents: []
    }
    clickHandle (path){
        window.location.href = path
    }

    componentDidMount (){
        //get more latest contents author
        db.collection("contents")
        .where("authorId", "==", this.props.authorId)
        .orderBy("createdAt","desc")
        .limit(7)
        .get()
        .then(querySnapshot => {
            const listContent = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    contentId: doc.id  
                }})
            this.setState({contents:listContent, loading:false})
            console.log("listContent",listContent)
                
        })
        
    
    
    }

 

    render() {
       
        
        
        return (
            <div>
                <div className={classes.RelatedWrapper}>
                <div className={classes.Title} > <TextWrapper styleFont="bold">{this.props.text}</TextWrapper></div>
                <div className={classes.Carrousel} >
                    
    
                    {this.state.contents.map(content =>(
                        <Link to={"/videos/"+content.contentId}  className={classes.ContentElement} onClick={()=> this.clickHandle("/videos/"+ content.contentId)}>
              
                            <img src={content.imageUrl} className={classes.ContentImage} alt={content.author} />
                            <div  className={classes.ContentAuthor}>
                            {content.author +"  -  "+ content.numberLikes + "👏"}
                            </div>
                            <div  className={classes.ContentDescription}>
                            {giveTitle(content.title)}
                            </div>
                            
            
                        </Link>

                    ))} 

                </div>


                </div>
            
            
            </div>
        )
    }

}



  

  
export default withRouter(RelatedContents);