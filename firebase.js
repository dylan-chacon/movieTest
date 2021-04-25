import * as firebase from "firebase";
import "firebase/firestore";

const config = firebaseConfig = {
    apiKey: "AIzaSyBk7bi_cGf9-oMRyeo_CY9dAoUZpedSh6o",
    authDomain: "movie-shop-4665b.firebaseapp.com",
    projectId: "movie-shop-4665b",
    storageBucket: "movie-shop-4665b.appspot.com",
    messagingSenderId: "316498365049",
    appId: "1:316498365049:web:f960717a4e85e59e90a2a8",
    measurementId: "G-49E64ZGCQ0",
};

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
