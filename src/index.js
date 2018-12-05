import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { InitializeFirebase } from './config';

firebase.initializeApp(InitializeFirebase);
// console.log(InitializeFirebase);

firebase.auth().useDeviceLanguage();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in.');
        console.log(user);
        
        sessionStorage.setItem("uid", user.uid);
        localStorage.setItem("sesion", 'true');
        firebase.database().ref(`users/${user.uid}/lastSeen`).set(new Date().getTime());

        ReactDOM.render(<App user={user} />, document.getElementById('root'));
    } else {
        console.log('No user is signed in.');

        // firebase.auth().signInAnonymously()
        //     .catch((error) => {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ...
        //         console.log(error);
        //     });
        sessionStorage.setItem("uid", "");
        localStorage.setItem("sesion", 'false');
        document.title = 'NetJob';

        ReactDOM.render(<App />, document.getElementById('root'));

    }
});

// firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//     console.log('Sign-out successful.');
// }).catch((error) => {
//     // An error happened.
//     console.log('An error happened.');
//     console.log(error);
// });

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
