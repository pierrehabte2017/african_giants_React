import React, { Component } from 'react';
import classes from "./Category.css"
import {withRouter} from "react-router-dom";
import {analytics} from "../../firestore";

class Category extends Component {

     // do something
     clickHandler = () =>{
         const cat = window.location.href.split("/").slice(-1)[0]
        analytics.logEvent('category_click',{categoryName: cat })
     }
     

    render (){
    let catName = window.location.href.split("/").slice(-1)[0]
    let stylecat = {border:"1px solid rgba(21,174,8,0.8)"}
   
    //differenciation active category
    if (catName===this.props.categoryName){
        stylecat = {
            ...stylecat,
            transform: "scale(1.13)",
            border:"2.5px solid rgba(21,174,8,100)"

        }
    }
    
    return(
    <div className={classes.CategoryWrapper}> 
        <div className={classes.Category} style={stylecat} onClick={()=>this.clickHandler()}>
            <img src={this.props.imageUrl} className={classes.Image} alt={"ethiopia " + this.props.representation["am"] + " "+ this.props.representation["en"]}/>
    
        </div>
        <div className={classes.NameAmharic} >
             {this.props.representation["am"]}
        </div>
        <div className={classes.Name} >
             {this.props.representation["en"]}
        </div>
        
    </div>)

}

}

export default withRouter(Category);