// import React, { Component} from 'react';
// import classes from "./MyProfilePage.css"
// import { connect } from 'react-redux';
// import {Link,withRouter} from "react-router-dom";
// import * as actions from "../../store/actions/index"
// import logoGurshabuzz from "../../assets/images/gursha.png"
// import backButtonImage from "../../assets/images/backButton.svg"

// class MyProfilePage extends Component {

//     state = {
//         info:null,
//         idUser:"-MKiabojC6YE6T0baEf7"
//     }

    
//     componentDidMount (){
//     }

//     shareHandler (e) {
//         this.props.onOpenShareModal("", "Gurshabuzz", "Welcome to Gurshabuzz!", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1280px-Flag_of_Ethiopia.svg.png" );
//     }

//     render () {
     
//         return (
//             <div>
//                {this.state.info?
//                <div className={classes.Background}>
//                     <div className={classes.ProfilePageWrapper}>

//                         <div className={classes.backButton} onClick={() => this.props.history.goBack()}>
//                             <img src={backButtonImage} className={classes.backButtonImage} />
//                             Back 
//                         </div>

//                         <img src={logoGurshabuzz} className={classes.ProfileImage}/>
                    
//                         <div className={classes.Username} >{this.state.info.name}</div>
                        
//                         <div className={classes.ApplyAuthor}> 
//                             <div className={classes.ApplyAuthorTopBar} > -- </div>
//                             <div className={classes.ApplyAuthorTitle} > 
//                                 Welcome to Gurshabuzz 💫
//                             </div>

//                             <div className={classes.ApplyAuthorDescription}>
//                                 <div className={classes.ApplyAuthorDescriptionText} > 
//                                     📍 We are super happy to have you in the Gurshabuzz community 👏🇪🇹. 
//                                 </div>
//                                 <div className={classes.ApplyAuthorDescriptionText} > 
//                                 📍If you have a Youtube channel you can apply for a creator account: 
//                                 </div>
//                                 <Link to = "/application" className={classes.Link}>
//                                 <div className={classes.ApplyAuthorButton} > 
//                                  Apply now
//                                 </div>
//                                 </Link>

                    
//                                 <div className={classes.ApplyAuthorDescriptionText} > 
//                                 📍 If you have any feedback or problem, don't hesitate to DM our team on Instagram!
//                                 </div>

//                                 <a href = "https://www.instagram.com/gurshabuzz" className={classes.Link}>
//                                     <div className={classes.FeedbackButtom}> 
//                                         Give feedback
//                                     </div>
//                                 </a>

//                                 <div className={classes.ApplyAuthorDescriptionText} > 
//                                 📍 You can start to enjoy the best of Habesha music, food, lifestyle and more ! 
//                                 Don't hesitate to clap when you enjoy a video. 
//                                 The more claps a video gets👏, the higher it will appear on your feed. Enjoy 🙏🇪🇹!
//                                 </div>

//                                 <img className={classes.EnjoyGif} src="https://media.giphy.com/media/J5vbA0IQq19x8Cv4Wc/giphy-downsized-large.gif" />


//                                 <div className={classes.ShareGurshaButtom} onClick={() => this.shareHandler()}> 
//                                  Share Gurshabuzz to friends and family 💖📲
//                                 </div>
//                             </div>
                            


//                         </div>
//                     </div>
//                 </div>
//             :null} 
            
//             </div>
           
//             );

// }

// }




// const mapStateToProps = state => {
//     return {
//         userConnected: state.userConnected,
//         userId: state.userId

//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//         onGetContents: (categoryId, categoryNames, contentsCached, page) => dispatch(actions.getContents(categoryId, categoryNames,contentsCached, page)),
//         onOpenShareModal: (pathShare, author, title, image) => dispatch(actions.openShareModal(pathShare, author, title, image)),
        
//     };
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyProfilePage));