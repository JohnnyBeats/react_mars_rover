import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVdxFCZwY8MMnmzujUpO6DIgoANDY6E5E",
    authDomain: "mars-rover-react.firebaseapp.com",
    databaseURL: "https://mars-rover-react.firebaseio.com",
    projectId: "mars-rover-react",
    storageBucket: "mars-rover-react.appspot.com",
    messagingSenderId: "125542855849",
    appId: "1:125542855849:web:f7e5a182697f9f57c865b8",
    measurementId: "G-30GG25YG8C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;