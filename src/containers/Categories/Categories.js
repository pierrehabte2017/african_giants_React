import React, { Component } from 'react';
import {
    Switch,
    Route,
    Redirect,
    NavLink,
  } from "react-router-dom";
  import { connect } from 'react-redux';

import Category from "../../components/Category/Category"
import Discover from "../Discover/Discover"
import classes from "./Categories.css"
import * as actions from "../../store/actions/index"
import DiscoverCreators from "../DiscoverCreators/DiscoverCreators"
import {analytics} from "../../firestore"
import translations from "../../translations"
import InfoWindow from "../../components/InfoWindow/InfoWindow"
class Categories extends Component  {

  state = {
     discoverSelected: window.location.href.split("/").slice(-1)[0] === "discover-authors",
     allSelected:window.location.href.split("/").slice(-1)[0] ==="all",
     width: window.innerWidth,
    height: window.innerHeight
  }

  

  componentDidMount () {
    this.props.onGetCategories(this.props.categories);
  }

  clickHandlerDiscover = () =>{
      const cat = window.location.href.split("/").slice(-1)[0]
      analytics.logEvent('discovery_click',{categoryName: cat })
      this.setState({discoverSelected:true})
  }

  clickHandlerCategory = () =>{
    this.setState({discoverSelected:false})
}


  

  render () {
    let styleDiscover = {border: "1px solid rgba(155,80,250, 1)", fontSize: "15px"}

    console.log("this.state.discoverSelected",this.state.discoverSelected)
    if (this.state.discoverSelected){
      styleDiscover = {...styleDiscover,
                        transform: "scale(1.13)",
                        border: "2.5px solid rgba(155,80,250, 1)",
                        fontWeight:"100",
                        }
    }

    let styleCat = { marginLeft:"0%",width: "100%"}
  
    if (this.state.width>600){
      styleCat = { 
        ...styleCat,
        marginLeft:"5%",
        width: "95%"}
    }
    

    console.log("categories",this.props.categories)

    return (
      <div>

        {this.props.categories.length>5 ?
        <div>
          

          <div className={classes.Categories} style={styleCat} >

              <NavLink className={classes.CategoryWrapper} to="discover-authors" className={classes.CategoryWrapper}> 
                  <div className={classes.DiscoverCreators} style={styleDiscover} onClick={()=>this.clickHandlerDiscover()}>
                    <div className={classes.DiscoverCreatorsText} >{translations.creator_discovery[this.props.language]} ✨</div>
                  </div>
              </NavLink>

              {this.props.categories.map((elt) => (
                  <NavLink to={"/"+elt["name"]}
                  key={elt["categoryId"]}
                  onClick ={()=> this.clickHandlerCategory()}
                  
                className={classes.CategoryWrapper}>
                  <meta name="keywords" content={elt['tags'].join(', ')}/>
                  <meta name="description" content={elt['description']}/>

                  <Category key={elt["categoryId"]} 
                            imageUrl={elt["imageUrl"]} 
                            categoryName={elt["name"]}
                            representation={elt["representation"]}
                            className={classes.Category}/>

                  </NavLink>
              ))}


          </div>

          {this.props.showInfoWindow?<InfoWindow/>:null}
          
          <Switch>
                <Route key="discoverCreators"
                    exact path="/discover-authors"
                    children={<DiscoverCreators />} 
                  />
                  {this.props.categories.map(cat => (
                  <Route key={cat.categoryId} 
                    exact path={"/"+cat.name}
                    children={<Discover categoryId={cat.categoryId} 
                                          emoji={cat.symbol}
                                          categoryName={cat.name}
                                          representation={cat.representation}/>} 
                  />
                    
                          
                  ))
                                            
                  }
                  <Redirect to="all" />
              </Switch>
      </div>:null}
      
    </div>);
      


  };
  
}

const mapStateToProps = state => {
  return {
      categories: state.categories,
      loadingCategories: state.loadingCategories,
      language: state.language,
      showInfoWindow:state.showInfoWindow
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onGetCategories: (categories) => dispatch(actions.getCategories(categories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
