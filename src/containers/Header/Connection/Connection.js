import React from 'react';
import classes from "./Connection.css"
import {Link} from 'react-router-dom';
import TextWrapper from "../../../components/TextWrapper/TextWrapper"
import translations from "../../../translations"

const Connection = (props) => {


    return (
        <Link  to="/application" className={classes.Connection}> 
            <div className={classes.SignIn} style={{backgroundColor: props.color}}>
            <TextWrapper >
                <div>{translations.become[props.language]}</div>
                <div>{translations.member[props.language]}</div>
            </TextWrapper>
            </div>
        </Link>
    )

    


}

export default Connection;