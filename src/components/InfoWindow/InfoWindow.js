import React, { Component } from 'react';
import classes from "./InfoWindow.css"
import TextWrapper from "../TextWrapper/TextWrapper"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import InstallButton from "../InstallButton/InstallButton"
import translations from "../../translations"

class InfoWindow extends Component{

    state = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    shareHandler (e) {
        this.props.onOpenShareModal("", "Gurshabuzz", "Welcome to Gurshabuzz!", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1280px-Flag_of_Ethiopia.svg.png" );
    }
    
    

    render (){
        const cat = window.location.href.split("/").slice(-1)[0]

        // width 
        let styleInfo = { width: "80%", top: "190px", left:"10%"}
        if (this.state.width>600 && cat==="all"){
            styleInfo  = {
                ...styleInfo ,
                width:"40%",
                top:"210px",
                left:"30%"
                
            }

        }
        

        let listText = [translations.message1[this.props.language],
                        translations.message2[this.props.language],
                        translations.message3[this.props.language] ]
        
        let d = new Date()
        let indice = (d.getHours()+0)%listText.length 

        return(
        <div>
            <div className={classes.InfoWindowWrapper}>
                <div className={classes.InfoWindow} style={styleInfo}>
                        <div className={classes.TopBar}></div>
                        {/* <div className={classes.Title}> {translations.welcome_info_window[this.props.language]} </div> */}
                        
                        <TextWrapper styleFont="bold">
                            <div className={classes.Text}> {listText[indice]} </div>
                        </TextWrapper>


                        <div className={classes.ButtonsWrapper}>
                            <div className={classes.ButtonLink} onClick={() => this.shareHandler()}> 
                            {translations.share_button[this.props.language]}
                            </div>

                        
                            <InstallButton className={classes.ButtonInstall} text_install={translations.install_app[this.props.language]}/>
                        
                        </div>
                </div>
            </div>
        </div>)

}

}


const mapStateToProps = state => {
    return {
        language: state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);