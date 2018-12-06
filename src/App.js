import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './views/signin/SignIn';
import Home from './views/home/Home';
import SignUp from './views/signup/SignUp';
import Categories from './views/categories/Categories';
import SubCategories from './views/sub_categories/SubCategories';
import Freelancers from './views/freelancers/Freelancers';
import Jobs from './views/jobs/Jobs';
import Profile from './views/profile/Profile';
import PostJob from './views/post_job/PostJob';
import HowItWorks from './views/how_it_works/HowItWorks';
import Work from './views/work/Work';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: "",
        photoURL: "",
        email: "",
        emailVerified: "",
        isAnonymous: "",
        phoneNumber: "",
        refreshToken: "",
        uid: ""
      }
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    let user = props.user;
    if (user) {
      this.setState({ user });

      let uid = user.uid;
      if (uid) {
        firebase.database().ref(`users/${uid}`).on('value', (snapshot) => {
          var profile = snapshot.val();
          if (profile) {
            this.setState({ profile });
          }
        });
      }
    }
  }

  render() {
    var sesion = localStorage.getItem("sesion") === "true" ? true : false;

    var user = this.state.user;
    var profile = this.state.profile;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact strict path='/post'
              render={() => (sesion ? <PostJob uid={user.uid} /> : <Redirect to="/home" />)} />

            <Route exact strict path='/profile'
              render={() => (sesion ? <Profile user={user} profile={profile} /> : <Redirect to="/home" />)} />

            <Route exact strict path='/signin'
              render={() => (sesion ? <Redirect to="/home" /> : <SignIn />)} />

            <Route exact strict path='/signup'
              render={() => (sesion ? <Redirect to="/home" /> : <SignUp />)} />

            {/* <Route path='/signin' render={() => (<SignIn />)} /> */}
            {/* <Route path='/signup' render={() => (<SignUp />)} /> */}
            <Route path='/home' render={() => (<Home />)} />
            <Route path='/categories' render={() => (<Categories />)} />
            <Route path='/sub_categories' render={() => (<SubCategories />)} />
            <Route path='/freelancers' render={() => (<Freelancers />)} />
            <Route path='/jobs' render={() => (<Jobs uid={user.uid} />)} />
            {/* <Route path='/profile/:id' exact strict component={Profile} /> */}
            <Route path='/how_it_works' render={() => (<HowItWorks />)} />
            {/* <Route path='/profile' render={() => (<Profile user={user} profile={profile} />)} /> */}
            {/* <Route path='/post' render={() => (<PostJob uid={user.uid} />)} /> */}
            <Route path='/work/:id' exact strict component={Work} />


            <Route exact strict path='/' render={() => <Redirect to="/home" />} />
            <Route exact strict path='' render={() => <Redirect to="/home" />} />

            {/* <Route component={Page404} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();   

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>



// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });



// {
//   status: 'connected',
//   authResponse: {
//       accessToken: '...',
//       expiresIn:'...',
//       signedRequest:'...',
//       userID:'...'
//   }
// }



// <fb:login-button 
//   scope="public_profile,email"
//   onlogin="checkLoginState();">
// </fb:login-button>



// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }