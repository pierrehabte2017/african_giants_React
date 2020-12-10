import React, { Component} from 'react';
import classes from "./ContactPage.css"
import {
    withRouter,
  } from "react-router-dom";
  import translations from "../../translations"
  import { connect } from 'react-redux';

import backButtonImage from "../../assets/images/backButton.svg"

class ContactPage extends Component {



    render () {
     
        return (
            <div>
                <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
                    <img src={backButtonImage} className={classes.backButtonImage} alt=""/>
                    Back 
                </div>

                <div className={classes.ContactWrapper}>
                    <div className={classes.ContactTopBar} > -- </div>
                    <div className={classes.ContactTitle} > {translations.contact_title[this.props.language]} </div>

                    

                    <div className={classes.ContactDescription}>
                        {translations.contact_p1[this.props.language]}
                    </div>

                    <div className={classes.ContactDescription}>
                    📍 insta: <a href="https://www.instagram.com/gurshabuzz/" target="_blank">@gurshabuzz</a>
                    </div>

                    <div className={classes.ContactDescription}>
                    📍 email: contact@gurshabuzz.com
                    </div>

                    <img src="https://media.giphy.com/media/h4In905tjBJoqxIbnq/giphy.gif" className={classes.Gif}/>
                    
                    <div className={classes.EndMessage}> {translations.about_follow_instagram[this.props.language]}</div>
                    

                </div>
                
            
            </div>
           
            );

}

}

const mapStateToProps = state => {
    return {
        language: state.language
    };
};
  
const mapDispatchToProps = dispatch => {
    return {};
  };

  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactPage));