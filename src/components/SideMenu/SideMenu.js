import React, { Component } from 'react';
import classes from "./SideMenu.css"
import closeImage from "../../assets/images/close.svg"
import { connect} from 'react-redux';
import * as actions from "../../store/actions/index"
import {Link} from "react-router-dom";
import translations from "../../translations"


class SideMenu extends Component {

    

    render (){

    if (!this.props.openedSideMenu){
        return null
    }

    const styleSelected = {
        transform: "scale(1.13)",
        border:"2px solid rgba(21,174,8,100)"

    }

    let styleEnglish = {border:"0.1px solid rgba(255,255,255, 0.3)"}
    let styleAmharic = {border:"0.1px solid rgba(255,255,255,0.3)"}
  
    if (this.props.language =="en"){
        styleEnglish = {...styleSelected}
    } else {
        styleAmharic = {...styleSelected}
    }

    


    return (
        <div>
            <div className={classes.Veil} onClick={this.props.onCloseSideMenu}>
            </div>
                <div className={classes.SideMenu}>
                    <div className={classes.CloseSideMenu} onClick={this.props.onCloseSideMenu}> 
                        <img src={closeImage} className={classes.CloseImage} />
                    </div>

                    
                    {/* <div className={classes.MenuTitle}>
                        {translations.menu[this.props.language]}
                    </div> */}

                    
                    <div className={classes.Navigation}>
                        <Link to="/about" style={{textDecoration: 'none'}} onClick={this.props.onCloseSideMenu} className={classes.ChoiceWrapper}>
                            <div className={classes.Choice}>
                                {translations.about[this.props.language]} 
                            </div>
                        </Link>

                        <Link to="/contact" style={{textDecoration: 'none'}} onClick={this.props.onCloseSideMenu} className={classes.ChoiceWrapper}>
                            <div className={classes.Choice}>
                                {translations.contact[this.props.language]} 
                            </div>
                        </Link>

                        <Link to="/application" style={{textDecoration: 'none'}} onClick={this.props.onCloseSideMenu} className={classes.ChoiceWrapper}>
                            <div className={classes.Choice}>
                            {translations.apply[this.props.language]} 
                            </div>
                        </Link>

                        
                        <div className={classes.ChangeLanguage}>
                            <label for="language" >Change language:</label>
                            
                            <div className={classes.LanguageChoice} style={styleAmharic} onClick={() => this.props.onChangeLanguage("am")}> 🇪🇹 አማርኛ </div>
                            <div className={classes.LanguageChoice} style={styleEnglish} onClick={() => this.props.onChangeLanguage("en")}> 🇺🇸 English</div>

                        </div>
                          
                            
                        
                    </div>
                </div>
            
        </div>
    )

    }

  }


  const mapStateToProps = state => {
    return {
        color: state.mainColor,
        openedSideMenu: state.openedSideMenu,
        language:state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onCloseSideMenu: () => dispatch(actions.closeSideMenu()),
        onChangeLanguage: (lang) => dispatch(actions.changeLanguage(lang))
    };
  };




export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);