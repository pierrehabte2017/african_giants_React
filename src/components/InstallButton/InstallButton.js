import React from "react";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import myLogo from "../../assets/images/logo_gursha.svg";
import classes from "./InstallButton.css"
import {analytics} from "../../firestore"

function InstallButton(props) {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
 
  const handleClick = () => {
    pwaInstall({
      title: "Install Gurshabuzz App 📲",
      logo: myLogo,
      features: (
        <div>
            <ul>
                <li>Discover trendy videos from Habesha creators <span role="img">🇪🇹✨</span></li>
                <li>Support your favorite videos with claps</li>
                <li>Visit the page of your favorite creators <span role="img">💁🏽‍♀️</span></li>
                <li>Share videos to your friend and family (and beyond) <span role="img">👨‍👩‍👧‍👦</span></li>
            </ul>
            
        </div>
      ),
      description: "Welcome to Gurshabuzz. The goal of the app is to have one place to discover the best Habesha creators. We hope that you will enjoy it 👏"
    })
      .then(() => {
            analytics.logEvent('install_click')
          alert("Thank you for installing Gurshabuzz App 🙏 We hope you will enjoy it!")})
      .catch(() => alert("You can always install it later 😉"));
  };
  console.log("supported, isInstalled",supported, isInstalled )
  return (
      <ReactPWAInstallProvider enableLogging>
          <div className = {classes.InstallButton}>

          {supported() && !isInstalled() ?
              <div type="button" onClick={handleClick}>
              {props.text_install}
              </div>:
              <a href="https://www.instagram.com/gurshabuzz/" target="_blank" style={{textDecoration:"none", color:"white"}}>
                Follow us 📲
              </a>}
          </div>
      </ReactPWAInstallProvider>

  );
}
 
export default InstallButton;