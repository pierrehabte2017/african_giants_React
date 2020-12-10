import React, { Component} from 'react';
import classes from "./ApplyPage.css"
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from "../../store/actions/index"
import backButtonImage from "../../assets/images/backButton.svg"
import translations from "../../translations"

class MyProfilePage extends Component {


    
    componentDidMount (){
        

    }



    render () {
     
        return (
            <div>
                <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
                    <img src={backButtonImage} className={classes.backButtonImage} />
                    Back 
                </div>
                <meta name="keywords" content="application, apply, gurshabuzz, rules, ethiopia"/>
                <meta name="description" content="You can apply as a creator to be part of the Gurshabuzz Community! To apply for a creator account, send us a DM on Instagram or an email with the following information..."/>

               <div className={classes.ApplicationWrapper}> 
                    <div className={classes.ApplicationTopBar} > -- </div>
                    <div className={classes.ApplicationTitle} >{translations.apply_title[this.props.language]}</div>
                    
                    <div className={classes.ApplicationDescription}>
                        {translations.apply_p1[this.props.language]}
                        <ul>
                            <li>{translations.apply_p1_1[this.props.language]}</li>
                            <li>{translations.apply_p1_2[this.props.language]}</li>
                            <li>{translations.apply_p1_3[this.props.language]}</li>
                            <li>{translations.apply_p1_4[this.props.language]}</li>
                        </ul>
                    </div>

            

                    <div className={classes.ApplicationDescription}>
                    {translations.apply_p2[this.props.language]}
                        <ul>
                            <li>✅{translations.apply_p2_1[this.props.language]}</li>
                            <li>✅{translations.apply_p2_2[this.props.language]} </li>    
                        </ul>
                    </div>

                    <div className={classes.ApplicationDescription}>
                        📍 email: contact@gurshabuzz.com
                    </div>

                    <div className={classes.ApplicationDescription}>
                        📍 insta: <a href="https://www.instagram.com/gurshabuzz/">@gurshabuzz</a>
                    </div>

                    <img src="https://media.giphy.com/media/UOQN52PwpYae4/giphy.gif" className={classes.Gif} alt="aminé rapper"/>

                    <div className={classes.EndMessage}> See you soon as a creator 🎉 </div>
               
               </div>

                
            
            </div>
           
            );

}

}




const mapStateToProps = state => {
    return {
        userConnected: state.userConnected,
        userId: state.userId,
        language:state.language,

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetContents: (categoryId, categoryNames, contentsCached, page) => dispatch(actions.getContents(categoryId, categoryNames,contentsCached, page)),
        onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyProfilePage));