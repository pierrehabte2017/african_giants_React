import React, { Component } from 'react';
import classes from "./SignupPage.css";
import facebookLogo from "../../assets/images/facebook.png"

const SignupPage = () => {

    
    return (
        <div className={classes.SignupPageMember}>
            <div className={classes.Welcome}> 
            Join with your email:
            </div>
            <input className={classes.EmailInput}
                    placeholder="Email"/>
            <input className={classes.PasswordInput}
                    placeholder="Password"
                    type="password"/>

            
            <button className={classes.SignupButton}>
                <div className={classes.SignupButtonText} > Sign up 🎉</div>
            </button>

            <div className={classes.Or}> 
                <div className={classes.LeftSign} ></div>
                <div className={classes.OrText} >or</div>
                <div className={classes.RightSign} ></div>

            </div>

            <button className={classes.FacebookSignupButton}>
            <img src={facebookLogo} className={classes.facebookLogo} />
                <div className={classes.FacebookSignupButtonText} > Sign up with Facebook</div>
            </button>

            
        </div>
    )

    
}


export default SignupPage;