import React, { Component } from 'react';
import './Profile.css';
import firebase from 'firebase';
import _ from 'lodash';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ProfileAsFreelancer from '../../components/profile_as_freelancer/ProfileAsFreelancer';
import ProfileAsClient from '../../components/profile_as_client/ProfileAsClient';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            user: {},
            profile: {},
            currentProfile: 'client'
        };
    }

    componentWillMount() {
        // let uid = sessionStorage.getItem("uid");
        // console.log(uid);
        // if (uid !== null && uid !== undefined && !_.isEmpty(uid)) {
        //     this.setState({ uid });

        //     firebase.database().ref(`users/${uid}`).on('value', (snapshot) => {
        //         var profile = snapshot.val();
        //         if (profile) {
        //             this.setState({ profile });
        //             let displayName = profile.displayName || '';
        //             document.title = `NetJob | ${displayName}`;
        //             console.log(profile);
        //         }
        //     });

        // }

        // var profile = this.state.profile;
        // if (profile) {
        //     let displayName = profile.displayName || '';
        //     document.title = `NetJob | ${displayName}`;
        // }

        // if (!this.props.user && !this.props.profile) {
        //     console.log(this.props.match.params.id);
        // }

        // console.log(user);
        // let uid = localStorage.getItem("uid");
        // if (!_.isEmpty(uid)) {
        //     if (!this.props.user && !this.props.profile) {
        //         let uidFromUrl = this.props.match.params.id;
        //         if (_.isEqual(uid, uidFromUrl)) {
        //             window.location.href = "/profile";
        //         }
        //     }
        // }
    }

    UNSAFE_componentWillReceiveProps(props) {
        // if (props.user) {
        //     this.setState({ user: props.user });
        //     let displayName = props.user.displayName || '';
        //     document.title = `NetJob | ${displayName}`;
        // }

        // if (props.profile) {
        //     this.setState({ profile: props.profile });
        // }

        // if (!props.user && !props.profile) {
        //     console.log(props.match.params.id);
        // }

        // console.log(props.user);
        // console.log(props.profile);
    }

    render() {
        var user = this.state.user;
        var profile = this.state.profile;

        var component = <ProfileAsClient user={user} profile={profile} />;
        // if(this.state.currentProfile === 'freelancer') {
        //     component = <ProfileAsFreelancer user={user} profile={profile} />;
        // } else {
        //     component = <ProfileAsClient user={user} profile={profile} />;
        // }

        return (
            <div className="Profile">
                <Header />
                <main role="main">
                    <div className="container" style={{ paddingTop: '4.5rem' }}>
                        {/* <div className="row justify-content-center" style={{ paddingTop: '4.5rem' }}>
                            <div className="col-sm-12 col-lg-11">
                                <nav>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a className="nav-link" role="button" href="/client" onClick={e => {e.preventDefault(); this.setState({ currentProfile: 'client' });}}>Mi Perfil Como Cliente</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" role="button" href="/freelancer" onClick={e => {e.preventDefault(); this.setState({ currentProfile: 'freelancer' });}}>Mi Perfil Como Freelancer</a>
                                        </li>
                                    </ul>
                                    <hr />
                                </nav>
                            </div>
                        </div> */}
                        {component}

                    </div>
                </main>
                <hr className="featurette-divider" />
                <Footer />
            </div>
        );
    }
}

export default Profile;