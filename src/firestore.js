import firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase

var firebaseConfig = {
apiKey: "AIzaSyAnm4Zco2vW86QkzY6E5nzNJ8yfr_RgDqQ",
authDomain: "gurshabuzz.firebaseapp.com",
databaseURL: "https://gurshabuzz.firebaseio.com",
projectId: "gurshabuzz",
storageBucket: "gurshabuzz.appspot.com",
messagingSenderId: "778304434469",
appId: "1:778304434469:web:da5ae92b5dc4202d98aacc",
measurementId: "G-EQ1J3XP506"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics();
const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);

//export db
export {db};
export {increment};
export {analytics};

