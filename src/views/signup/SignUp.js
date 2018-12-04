import React, { Component } from 'react';
import './SignUp.css';
// import './util.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError, writeUserData } from '../../functions/my-firebase';
import SignUpModal from '../../components/signup_modal/SignUpModal';
import Header from '../../components/header/Header';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getRandomColor = () => {
        return ((1 << 24) * Math.random() | 0).toString(16);
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    handleSubmit = () => {
        let username = _.trim(_.startCase(_.lowerCase(document.querySelector('#username').value)));
        let lastname = _.trim(_.startCase(_.lowerCase(document.querySelector('#lastname').value)));
        let email = _.trim(_.toLower(document.querySelector('#email').value));
        let password = _.trim(document.querySelector('#password').value);
        let ckb_signup = document.querySelector('#ckb-signup').checked;

        let firstLetter = username.charAt(0);

        if (!ckb_signup) {
            swal({
                title: "¡Atención!",
                text: "Para registrarte debes aceptar los términos de servicio y la política de privacidad de CodeScript.",
                icon: "info",
                button: "Aceptar",
            });
            return;
        }

        // console.log({
        //     username,
        //     lastname,
        //     email,
        //     password,
        //     firstLetter,
        //     color: this.getRandomColor(),
        //     url: `http://placehold.it/360/${this.getRandomColor()}/fff&text=${firstLetter}`
        // });
        // return;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var user = firebase.auth().currentUser;

                if (user) {
                    user.updateProfile({
                        displayName: `${username} ${lastname}`,
                        photoURL: `http://placehold.it/360/${this.getRandomColor()}/fff&text=${firstLetter}`
                    }).then(() => {
                        user.sendEmailVerification().then(() => {
                            swal({
                                title: "¡Registro exitoso!",
                                text: "Por favor, verifica tu correo a través del mensaje que ha sido enviado a su cuenta. Para personalizar su cuenta, visita tu nuevo perfil.",
                                icon: "success",
                                button: "Aceptar",
                            });
                        }).catch((error) => {
                            // An error happened.
                            console.log(error);
                        });

                        writeUserData(user);
                    }).catch((error) => {
                        console.log(error);
                        swal({
                            title: "¡Error!",
                            text: "Ocurrió un error en su registro.",
                            icon: "info",
                            button: "Aceptar",
                        });
                    });
                } else {
                    // No user is signed in.
                    console.log(user);
                }

            })
            .catch((error) => {
                // Handle Errors here.
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
            <div className="SignUp">
                <Header hideButtonPost={true} />
                
                <div className="limiter">
                    <div className="container-login100" style={{ paddingTop: '3rem' }}>
                        <div className="wrap-login100">
                            <div className="login100-form-title" style={{ backgroundImage: 'url(./images/6.jpeg)' }}>
                                <span className="login100-form-title-1">Registrate</span>
                            </div>
                            <form onSubmit={e => e.preventDefault()} className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26 custom-wrap-input100" data-validate="Username is required">
                                    {/* <span className="label-input100">Usuario</span> */}
                                    <input className="input100" type="text" id="username" placeholder="Nombre" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-26 custom-wrap-input100" data-validate="Username is required">
                                    {/* <span className="label-input100">Usuario</span> */}
                                    <input className="input100" type="text" id="lastname" placeholder="Apellidos" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required" style={{ width: '100%' }}>
                                    {/* <span className="label-input100">Usuario</span> */}
                                    <input className="input100" type="email" id="email" placeholder="Correo" autoComplete="true" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required" style={{ width: '100%' }}>
                                    {/* <span className="label-input100">Contraseña</span> */}
                                    <input className="input100" type="password" id="password" placeholder="Contraseña" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="flex-sb-m w-full p-b-30">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb-signup" type="checkbox" />
                                        <label className="label-checkbox100" htmlFor="ckb-signup">Al crear tu cuenta, estás aceptando los términos de servicio y la política de privacidad de CodeScript.</label>
                                    </div>
                                    {/* <div>
                                        <a href="#" onClick={this.handleFogotPassword} className="txt1" role="button">¿Olvidaste tu contraseña?</a>
                                    </div> */}
                                </div>
                                <div className="container-login100-form-btn">
                                    <button onClick={this.handleSubmit} className="login100-form-btn">Registrarte</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <SignUpModal />
            </div>
        );
    }
}

export default SignUp;
