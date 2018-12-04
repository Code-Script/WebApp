import React, { Component } from 'react';
import './SignUpModal.css';
import swal from 'sweetalert';
import firebase from 'firebase';
import { msgError, writeUserData } from '../../functions/my-firebase';
window.$ = window.jQuery = require('jquery');

class SignUpModal extends Component {

    signUpWithGoogle = () => {
        var redirect = this.props.redirect || null;

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            writeUserData(user);
            if (redirect) {
                window.location.href = redirect;
            }
            window.$('#SignUpModal').modal('hide');
        }).catch((error) => {
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            swal({
                title: "¡Atención!",
                text: msgError(error.code, error.message),
                icon: "info",
                button: "Aceptar",
            });
        });
    }

    signUpWithFacebook = () => {
        var redirect = this.props.redirect || null;

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            writeUserData(user);
            if (redirect) {
                window.location.href = redirect;
            }
            window.$('#SignUpModal').modal('hide');
        }).catch((error) => {
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            swal({
                title: "¡Atención!",
                text: msgError(error.code, error.message),
                icon: "info",
                button: "Aceptar",
            });
        });
    }

    render() {
        return (
            <div className="modal fade" id="SignUpModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="HireModalCenterTitle">Ofrece tus servicios a ***</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div> */}
                        {/* <div className="modal-body"> */}
                        {/* <main> */}
                        <div className="row justify-content-center text-center" style={{ padding: "30px 25px" }}>
                            <div className="col-sm-12 col-md-11">
                                <h1>CODESCRIPT LOGIN</h1>
                                <button onClick={this.signUpWithFacebook.bind(this)} className="loginBtn loginBtn--facebook">
                                    Ingresar con Facebook
                                </button>
                                <button onClick={this.signUpWithGoogle.bind(this)} className="loginBtn loginBtn--google">
                                    Ingresar con Google
                                </button>
                                <span className="text-secundary">OR</span>
                                <button className="loginBtn loginBtn--email" onClick={() => window.location.href = "/signup"}>
                                    Registrarse con Email
                                </button>
                                <button className="loginBtn loginBtn--email" onClick={() => window.location.href = "/signin"}>
                                    Iniciar sesión con Email
                                </button>
                                <p className="text-secundary">By singing up, you agree to codescript</p>
                                <span className="text-secundary pp-0"><a href="#" className="text-secundary">Terms of use</a> and <a href="#" className="text-secundary">Privacity pilicy</a></span>
                            </div>
                        </div>
                        {/* </main> */}
                        {/* </div> */}
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ENVIAR SOLICITUD</button>
                        </div> */}
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUpModal;
