import React, { Component } from 'react';
import classes from "./ShareModal.css"
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import translations from "../../translations"
import {WhatsappShareButton, 
    TelegramShareButton,
    ViberShareButton,
    FacebookShareButton,
    EmailShareButton,
    RedditShareButton,
    LinkedinShareButton} from "react-share";

//import images
import whatsappImage from "../../assets/images/whatsapp.png"
import telegramImage from "../../assets/images/telegram.svg"
import viberImage from "../../assets/images/viber.png"
import messengerImage from "../../assets/images/messenger.jpg"
import facebookImage from "../../assets/images/facebook.png"
import redditImage from "../../assets/images/reddit.png"
import emailImage from "../../assets/images/email.svg"
import linkedinImage from "../../assets/images/linkedin.png"
import closeImage from "../../assets/images/close.svg"

import {withRouter} from "react-router-dom";
class ShareModal extends Component {
    
    state = {
        copied: false,
      };

    closeModalHandler(){
        this.setState({copied:false})
        this.props.onCloseShareModal()
    }

    render (){
        const rootLink = window.location.href.split("/").slice(0, 3).join("/")
        const linkToShare = rootLink.concat(this.props.pathToShare)
    
        
        return (
            <div>
                {this.props.openedShareModal?
                <div>
                    <div className={classes.Veil} onClick={() => this.closeModalHandler()}></div> 
                
                    <div className={classes.Background}>
                        <div className={classes.TitleShareTo} > {translations.share_to[this.props.language]}</div>
                        <img className={classes.Close} src={closeImage} onClick={() => this.closeModalHandler()} />

                        <div className={classes.CarrouselShare}>
                            <WhatsappShareButton url={linkToShare} 
                                                 title={this.props.titleContentToShare}
                                                 separator="➡️"
                                                className={classes.WrapperImageShare}>
                                <img className={classes.ImageCarrousel} src={whatsappImage }/>
                                <div className={classes.nameImage}>Whatsapp</div>
                            </WhatsappShareButton>

                            <TelegramShareButton url={linkToShare} 
                                                className={classes.WrapperImageShare}
                                                title={this.props.titleContentToShare.concat("💫Source: Gurshabuzz 📲🇪🇹")}>

                                <img className={classes.ImageCarrousel} src={telegramImage}/>
                                <div className={classes.nameImage}>Telegram</div>
                            </TelegramShareButton>

                 
                            <div className={classes.WrapperImageShareMessenger} 
                                onClick={ () => {
                                    window.location.href =
                                        'fb-messenger://share?link=' +
                                        encodeURIComponent(linkToShare) +
                                        '&app_id=' +
                                        encodeURIComponent( 2815687398714408 )
                                } }>

                                <img className={classes.ImageCarrouselMessenger} src={messengerImage}/>
                                <div className={classes.nameImageMessenger}>Messenger</div>
                            </div>



                            <ViberShareButton url={linkToShare} 
                                              className={classes.WrapperImageShare}
                                              separator="➡️"
                                              title={this.props.titleContentToShare.concat("💫Source: Gurshabuzz 📲🇪🇹")}>
                                <img className={classes.ImageCarrousel} src={viberImage}/>
                                <div className={classes.nameImage}>Viber</div>
                            </ViberShareButton>
                           
        

                            <FacebookShareButton url={linkToShare} 
                                                quote={this.props.titleContentToShare}
                                                className={classes.WrapperImageShare}>
                                <img className={classes.ImageCarrousel} src={facebookImage}/>
                                <div className={classes.nameImage}>Facebook</div>
                            </FacebookShareButton>


                            <EmailShareButton url={linkToShare} 
                                            className={classes.WrapperImageShare}
                                            subject="Check this out 👀🇪🇹"
                                            body={this.props.titleContentToShare}>
                                <img className={classes.ImageCarrousel} src={emailImage}/>
                                <div className={classes.nameImage}>Facebook</div>
                            </EmailShareButton>

                            <RedditShareButton url={linkToShare} 
                                              className={classes.WrapperImageShare}
                                               title={this.props.titleContentToShare}>

                                <img className={classes.ImageCarrousel} src={redditImage}/>
                                <div className={classes.nameImage}>Reddit</div>
                            </RedditShareButton>

                            <LinkedinShareButton url={linkToShare} 
                                                className={classes.WrapperImageShare}
                                                title={this.props.titleContentToShare}
                                                summary=""
                                                source="Gurshabuzz">
                                <img className={classes.ImageCarrousel} src={linkedinImage}/>
                                <div className={classes.nameImage}>Email</div>
                            </LinkedinShareButton>

                
                            
                            
                            

                        </div>


                        <div className={classes.TitleShareLink} > {translations.share_link[this.props.language]}</div>

                        <div className={classes.InputLink} > 
                            <div className={classes.InputLinkText}>{linkToShare} </div>
                            <CopyToClipboard text={linkToShare}
                                
                                onCopy={() => this.setState({copied: true})}>
                                <button className={classes.ButtonLinkCopy}>
                                    <div className={classes.InputLinkCopy}>🔗</div>
                                    <div className={classes.InputLinkCopyText}> {this.state.copied?"copied !":"copy link"}</div> 
                                    
                                </button>
                            </CopyToClipboard>
                        </div>
                       
                    
                </div></div>: null
            }
        </div>
        )

    }

  }


  const mapStateToProps = state => {
    return {
        openedShareModal: state.openedShareModal,
        pathToShare: state.pathToShare,
        authorContentToShare:state.authorContentToShare,
        titleContentToShare:state.titleContentToShare,
        imageContentToShare:state.imageContentToShare,
        language:state.language
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onCloseShareModal: () => dispatch(actions.closeShareModal()),
        onOpenShareModal: () => dispatch(actions.openShareModal())
    };
  };




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShareModal));