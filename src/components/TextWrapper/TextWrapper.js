import React from 'react';
import classes from "./TextWrapper.css"

const TextWrapper = (props) => {

    let classname=classes.TextWrapperRegular;

    if (props.styleFont === 'bold'){
        classname=classes.TextWrapperBold
    }

    return (
        <div className={classname}>
            {props.children}
        </div>
    )

  }

  export default TextWrapper;