import React, { Component} from 'react';
import classes from "./AboutPage.css"
import {withRouter} from "react-router-dom";
import translations from "../../translations"
import { connect } from 'react-redux';

import backButtonImage from "../../assets/images/backButton.svg"

class AboutPage extends Component {



    render () {
     
        return (
            <div>
                <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
                    <img src={backButtonImage} className={classes.backButtonImage} alt="" />
                    Back 
                </div>

                <meta name="keywords" content="about, gurshabuzz, rules, ethiopia"/>
                <meta name="description" content="Gurshabuzz is an app that gathers the best of Habesha creators. From food, music or humor, we gather people around our beautiful Habesha culture !"/>
                

                <div className={classes.AboutWrapper}>
                    <div className={classes.AboutTopBar} > -- </div>
                    <div className={classes.AboutTitle} > {translations.about_gurshabuzz[this.props.language]}</div>

                    <div className={classes.AboutDescription}>
                        {translations.about_p1[this.props.language]}
                    </div>


                    <div className={classes.AboutDescription}>
                        {translations.about_p2[this.props.language]}
                    </div>

                    <div className={classes.AboutDescription}>
                    📍 insta: <a href="https://www.instagram.com/gurshabuzz/" target="_blank">@gurshabuzz</a>
                    </div>

                    <div className={classes.AboutDescription}>
                    📍 email: contact@gurshabuzz.com
                    </div>

                    <img src="https://media.giphy.com/media/MXdAkI0ehOQNtJ7OxF/giphy.gif" className={classes.Gif}/>
                    
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
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AboutPage));