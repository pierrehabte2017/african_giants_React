import React, { Component } from 'react';
import classes from "./Layout.css"
import Header from "../../containers/Header/Header"
import SideMenu from "../../components/SideMenu/SideMenu"
import ShareModal from "../../components/ShareModal/ShareModal"
import CommentModal from "../../components/CommentModal/CommentModal"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"

class Layout extends Component {

    // onChange (isVisible) {
    //     if (isVisible){
    //         this.props.onGetContents(this.props.categoryId, this.props.categoryName, this.props.contentsCached, this.props.lastScores, true)

    //     }
    // }
  
    render () {
        return (
            <div className={classes.Layout}>
                <Header color={this.props.color} language={this.props.language}/>
                <div className={classes.Children}>
                    {this.props.children}
                </div>
                <SideMenu openedSideMenu={this.props.openedSideMenu} />
                <ShareModal openedShareModal={this.props.openedShareModal} />
                <CommentModal openedCommentModal={this.props.openedCommentModal} />


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contents: state.contents,
        loadingContents: state.loadingContents,
        categories: state.categories,
        contentsCached: state.contentsCached,
        lastScores: state.lastScores,
        language: state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetContents: (categoryId, categoryNames, contentsCached, lastScores, refresh) => dispatch(actions.getContents(categoryId, categoryNames,contentsCached, lastScores, refresh))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Layout);