import React, { Component } from 'react';
import './Header.css';
import swal from 'sweetalert';
import firebase from 'firebase';
import SignUpModal from '../signup_modal/SignUpModal';
import _ from 'lodash';
window.$ = window.jQuery = require('jquery');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            user: {}
        };
        this.handlePostNotSession = this.handlePostNotSession.bind(this);
    }

    UNSAFE_componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                if (!_.isEmpty(uid)) {
                    firebase.database().ref(`users/${uid}`).on('value', snapshot => {
                        var user = snapshot.val();
                        if (user) {
                            this.setState({ user });
                        }
                    });
                }
            } else {
                // console.log('No user is signed in.');
                this.setState({ user: {} });
            }
        });
        // var uid = sessionStorage.getItem("uid");
        // if (!_.isEmpty(uid)) {
        //     firebase.database().ref(`users/${uid}`).on('value', snapshot => {
        //         var user = snapshot.val();
        //         if (user) {
        //             this.setState({ user });
        //         }
        //     });
        // }
    }

    handlePostNotSession = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/post' });
        window.$('#SignUpModal').modal('show');
        // data-toggle="modal" data-target="#SignUpModal"
        // $('#myModal').modal('toggle');
        // $('#myModal').modal('hide');
    }

    handleLogOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.');
            // document.location.href = '/home';
            // swal({
            //     title: "Sesión cerrada",
            //     text: "La sesión ha sido cerrada correctamente.",
            //     icon: "success",
            //     button: "Aceptar",
            // });
        }).catch((error) => {
            // An error happened.
            console.log('An error happened.');
            console.log(error);
        });
    }

    // componentDidUpdate() {
    //     var sesion = this.props.sesion || false;
    //     this.setState({ sesion });
    // }

    render() {
        var sesion = localStorage.getItem("sesion") === "true" ? true : false;

        var buttonPost,
            buttonSignUpOrProfile;

        if (sesion === true) {
            var user = this.state.user;
            buttonPost = <a role="button" aria-disabled="true" href="/post" className="btn btn-success my-2 my-sm-0">PUBLICAR TRABAJO</a>;
            // buttonSignUpOrProfile = <button className="btn btn-outline-info mr-2" role="button" onClick={() => window.location.href = '/profile'}>MI PERFIL</button>;

            buttonSignUpOrProfile = <div className="input-group-prepend mr-2 header-button-profile">
                <button type="button" onClick={() => document.location.href = "/profile"} className="btn btn-outline-secondary pr-1 pl-1">
                    <img src={user.photoURL || ""} className="img-fluid mr-1" style={{ maxWidth: "28px", border: "1px solid rgba(222, 226, 230, 0.2)", borderRadius: "50%" }}></img>
                    {user.displayName || ""}
                </button>
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle mr-1 pr-1 pl-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="/profile">Mi perfil</a>
                        <a className="dropdown-item" href="/logout" onClick={this.handleLogOut}>Cerrar sesión</a>
                        {/* <a className="dropdown-item" href="#">Something else here</a> */}
                    </div>
                </div>
            </div>;
            // <div className="input-group-prepend mr-2 header-button-profile">
            //     <button type="button" onClick={() => document.location.href = "/profile"} className="btn btn-outline-secondary">{user.displayName || ""}</button>
            //     <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //         <span className="sr-only">Toggle Dropdown</span>
            //     </button>
            //     <div className="dropdown-menu">
            //         <a className="dropdown-item" href="/profile">Mi perfil</a>
            //         <a className="dropdown-item" href="/logout" onClick={this.handleLogOut}>Cerrar sesión</a>
            //         <a className="dropdown-item" href="#">Something else here</a>
            //         <div role="separator" className="dropdown-divider"></div>
            //         <a className="dropdown-item" href="#">Separated link</a>
            //     </div>
            // </div>;
        } else {
            buttonPost = <a role="button" aria-disabled="true" href="/post" className="btn btn-success my-2 my-sm-0" onClick={this.handlePostNotSession}>PUBLICAR TRABAJO</a>;
            buttonSignUpOrProfile = <button className="btn btn-outline-info mr-2" data-toggle="modal" data-target="#SignUpModal" role="button">INGRESAR</button>;
        }

        var hideButtonPost = this.props.hideButtonPost;
        if (hideButtonPost === true) {
            buttonPost = "";
        }

        return (
            <header className="Header">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="/home">NetJob</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/freelancers">FREELANCERS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/jobs">TRABAJOS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/how_it_works">¿CÓMO FUNCIONA?</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mt-2 mt-md-0">
                            <li className="nav-item">
                                {buttonSignUpOrProfile}
                            </li>
                        </ul>
                        {buttonPost}
                    </div>
                </nav>
                <SignUpModal redirect={this.state.redirect} />
            </header>
        );
    }
}

export default Header;
