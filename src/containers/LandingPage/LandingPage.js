import React, { Component } from 'react';
import classes from "./LandingPage.css";


class LandingPage extends Component {

    state = {
        lang:"en"
    }

    changeLanguageHandler(){
        if (this.state.lang==="en"){
            this.setState({lang:"am"})
        }
        else{
            this.setState({lang:"en"})
        }
    }

    render(){
        let styleEn = {}
        let styleAm = {}

        if (this.state.lang ==="en"){
            styleEn = { transform:  "scale(1.1)", borderColor:"white"}
        }else{
            styleAm = { transform:  "scale(1.1)", borderColor:"white"}
        }
        return (
            <div className={classes.LandingPage}>
                <div className={classes.Languages}>
                    <div className={classes.LanguagesChoice} onClick={() => this.changeLanguageHandler()} style={styleEn}> 
                    🇺🇸 English 
                    </div>
                    <div className={classes.LanguagesChoice} onClick={() => this.changeLanguageHandler()} style={styleAm}> 
                    🇪🇹 አማርኛ 
                    </div>

                </div>
                <div className={classes.Title}> 
                    {this.state.lang==="en"?"Welcome to Gurshabuzz💫🇪🇹":"እንኩአን ደህና መጡ ጉርሻ ቡዝ💫🇪🇹"}
                </div>

                <div className={classes.DescriptionWrapper}> 
                    <div className={classes.Description1}>
                    {this.state.lang==="en"?"We are a community of proud Habesha people sharing good news, music, food, movies and more!":
                        "እኛ መልካም ዜናዎችን ፣ ሙዚቃዎችን ፣ ምግቦችን ፣ ፊልሞችን እና ሌሎችንም የምንጋራ የኩሩ የኢትዮጵያ ህዝቦች ማህበረሰብ ነን!"}
                    </div>
                    

                    <div className={classes.Description2}>
                    {this.state.lang==="en"?"The website is mobile only 📲  ...so join us on your phone 😁":
                     "ድር ጣቢያው ተንቀሳቃሽ ብቻ ነው 📲 ስለዚህ በስልክዎ ላይ እኛን ይቀላቀሉ 😁"}
                    </div>

                </div>

                <img className={classes.Gif} src="https://media.giphy.com/media/iYEvkJb0PJJCg/giphy.gif"/>
            </div>
            
        )

    }
}


export default LandingPage;