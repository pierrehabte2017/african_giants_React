import React from 'react';
import classes from "./LoginPage.css";
import {Link} from 'react-router-dom';

const LoginPage = (props) => {

    
    return (
        <div className={classes.LoginPageMember}>
            <div className={classes.Welcome}> 
            Welcome back to GurshaBuzz ✨
            </div>
            <input className={classes.EmailInput}
                    placeholder="Email or Phone number"/>
            <input className={classes.PasswordInput}
                    placeholder="Password"
                    type="password"/>

            <div className={classes.ForgotPassword} > Forgot password? Click 
                <div className={classes.ForgotPasswordButton} >here</div> 
            </div>

            <button className={classes.LoginButton}>
                <div className={classes.LoginButtonText} > Log in 🎉</div>
            </button>

            <div className={classes.SignUp} > 😇 Not registered yet? Sign up 
                <Link to="/signup"><div className={classes.SignUpButton} >here</div> </Link>
            </div>
            
        </div>
    )

    
}


export default LoginPage;