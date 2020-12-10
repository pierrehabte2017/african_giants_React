import React, { Component } from 'react';
import classes from "./BurgerMenu.css"
import burgerLogo from "../../../assets/images/burger_menu.svg"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';



class BurgerMenu extends Component {


    onClickBurgerMenu () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        this.props.onOpenSideMenu()

    }

    render() {
      
    return (
        <div className={classes.BurgerMenu} onClick={() => this.onClickBurgerMenu()}> 
        <img src={burgerLogo} alt="burgerLogo" />
        </div>
    )
}
}




const mapStateToProps = state => {
    return {
        color: state.mainColor,
        openedSideMenu: state.openedSideMenu
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenSideMenu: () => dispatch(actions.openSideMenu())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);



  
