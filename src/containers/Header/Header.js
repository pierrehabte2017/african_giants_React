import React from 'react';
import { useMediaQuery } from 'react-responsive'
import classes from "./Header.css"
import BurgerMenu from "./BurgerMenu/BurgerMenu.js"
import Logo from "./Logo/Logo.js"
import Connection from "./Connection/Connection.js"


const Header = (props) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })
    

    // different size of header depending on if we are on mobile/desktop
    const styleHeader = {
        height: isTabletOrMobile? "50px" :"50px"
    }


    const styleLogo = {
        height: isTabletOrMobile? "20%" :"40%",
        top: isTabletOrMobile? "10px" :"15px" ,
        left: isTabletOrMobile? "55px" :"75px" 
    }

    const styleBurgerMenu = {
        top: isTabletOrMobile? "13px" :"15px" ,
        position: "absolute",
        
    }

    const styleConnection = {
        top: isTabletOrMobile? "7px" :"15px" ,
        position: "absolute",
        right: isTabletOrMobile? "17px" :"50px",
    }
    


    return (
        <header className={classes.Header} style={styleHeader} > 
            <div style={styleBurgerMenu}>
                <BurgerMenu exemple={"exemple"}/>
            </div>
            <div className={classes.Logo} style={styleLogo}>
                <Logo color={props.color}/>
            </div>
            <div className={classes.Connection} style={styleConnection}>
                <Connection color={props.color} language={props.language}/>
            </div>
            
        </header>
    )

    
}


export default Header;