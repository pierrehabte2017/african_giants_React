import React, { Component } from 'react';
import classes from  './App.css';
import { connect } from 'react-redux';
import { BrowserRouter ,Switch, Route, Redirect} from 'react-router-dom';
import Categories from "./containers/Categories/Categories"
import InfoWindow from "./components/InfoWindow/InfoWindow"
import Discover from "./containers/Discover/Discover"
import TextWrapper from "../src/components/TextWrapper/TextWrapper"
import DisplayPage from './components/DisplayPage/DisplayPage';
import Layout from "./hoc/Layout/Layout"
// import LoginPage from "../src/containers/LoginPage/LoginPage"
import LandingPage from "../src/containers/LandingPage/LandingPage"
import DiscoverCreators from "../src/containers/DiscoverCreators/DiscoverCreators"
// import SignupPage from "../src/containers/SignupPage/SignupPage"
import AuthorPage from "../src/containers/AuthorPage/AuthorPage"
// import MyProfilePage from "../src/containers/MyProfilePage/MyProfilePage"
import ApplyPage from "../src/containers/ApplyPage/ApplyPage"
import AboutPage from "../src/containers/AboutPage/AboutPage"
import ContactPage from "../src/containers/ContactPage/ContactPage"
import * as actions from './store/actions/index';



// const LandingPage = React.lazy(() => import("../src/containers/LandingPage/LandingPage"));


class App extends Component {



 
  render() {
    
    //check that the user is using a phone
    const { innerWidth: width, innerHeight: height } = window;
    let isTabletOrMobile = true
    if (width>4600){
      isTabletOrMobile=false
    }

    return (
      
      <BrowserRouter>
        <TextWrapper>
        {isTabletOrMobile?
        <Layout color={this.props.color}
                    openedSideMenu={this.props.openedSideMenu}
                    openedShareModal={this.props.openedShareModal}
                    openedCommentModal={this.props.openedCommentModal}>

            <div className={classes.App}>
            
          
              <Switch>
              <Route path="/contact" children={<ContactPage/>}/>
              <Route path="/about" children={<AboutPage/>}/>
              <Route path="/application" children={<ApplyPage/>}/>
              <Route exact path="/videos/:id" children={<DisplayPage/>}/>
              <Route path="/author/:id" children={<AuthorPage/>}/>
              <Route path="/" children={<Categories />}/>
              <Redirect to={"/all"}/>
            </Switch>
          
            </div>
            </Layout>:<LandingPage/>}
            
          </TextWrapper>
      </BrowserRouter>
      
    );
  }
}



const mapStateToProps = state => {
  return {
      color: state.mainColor,
      openedSideMenu: state.openedSideMenu,
      categories: state.categories,
      loadingCategories: state.loadingCategories,
      showInfoWindow:state.showInfoWindow
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onLoadCategories: () => dispatch(actions.closeSideMenu)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App