import React, { Component } from 'react';
import classes from "./CommentModal.css"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import {withRouter} from "react-router-dom";
import closeImage from "../../assets/images/close.svg"
import TextWrapper from "../TextWrapper/TextWrapper"

class CommentModal extends Component {
    
    state = {
        copied: false,
      };

    closeModalHandler(){
        this.props.onCloseCommentModal()
      
    }

    render (){
        
        return (
            <div>
                {this.props.openedCommentModal?

                <div>
                    <div className={classes.Veil} onClick={() => this.closeModalHandler()}></div> 
                    
                    <div className={classes.Background}>
                        <TextWrapper styleFont="bold" > 
                            <div className={classes.Title} > Comments </div>
                        </TextWrapper>
                    
                        <img className={classes.Close} src={closeImage} onClick={() => this.closeModalHandler()} />
                    
                        <img src="https://media.giphy.com/media/dvP919POx9RCwp0Tf8/giphy.gif"  className={classes.Image}/>

                        <div className={classes.TextExplanation}>
                            The comment feature will be released very soon 😁! 
                            Follow us on Instagram to stay tuned 👇
                        </div>

                        <a className={classes.FollowButton} href="https://www.instagram.com/gurshabuzz/">
                            Follow us 
                        </a>

                    </div>





                </div>
                
                :null}
            </div>
        )

    }

  }


  const mapStateToProps = state => {
    return {
        openedCommentModal: state.openedCommentModal,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onCloseCommentModal: () => dispatch(actions.closeCommentModal()),
        onOpenCommentModal: () => dispatch(actions.openCommentModal())
    };
  };




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentModal));