import React, { Component } from 'react';
import './SignIn.css';
import './util.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/my-firebase';
// import { generatePassword } from '../../functions/password_hash';
import Header from '../../components/header/Header';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailForSignIn: "",
            checked: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFogotPassword = this.handleFogotPassword.bind(this);
    }

    componentWillMount() {
        let emailForSignIn = window.localStorage.getItem('emailForSignIn');
        if (emailForSignIn) {
            this.setState({ emailForSignIn });
            this.setState({ checked: true });
        }
    }

    handleSubmit = () => {
        let email = _.trim(document.querySelector('#email').value);
        let password = _.trim(document.querySelector('#password').value);
        let remenberMe = document.querySelector('#ckb-remenber-me').checked;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                if (remenberMe) {
                    window.localStorage.setItem('emailForSignIn', email);
                    // window.localStorage.setItem('passForSignIn', generatePassword(password));
                }

                // swal({
                //     title: "Good job!",
                //     text: "Coming soon...",
                //     icon: "success",
                //     button: "Okay",
                // });
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

    handleFogotPassword = (event) => {
        event.preventDefault();
        var email = this.state.email;
        var re = /\S+@\S+\.\S+/;

        if (_.isEmpty(email)) {
            swal({
                title: "¡Atención!",
                text: `Debe escribir un correo válido.`,
                icon: "info",
                button: "Aceptar"
            })
                .then(() => {
                    return;
                });
        } 

        if(!re.test(email)) {
            swal({
                title: "¡Atención!",
                text: `Debe escribir un formato de correo válido.`,
                icon: "info",
                button: "Aceptar"
            })
                .then(() => {
                    return;
                });
        }

        swal({
            title: "Restaurar contraseña",
            text: `Al pulsar sobre el botón aceptar se enviará un enlace para el restablecimiento de la contraseña al correo: ${email}`,
            icon: "info",
            buttons: {
                cancel: "Cancelar",
                send: "Aceptar"
            }
        })
            .then((value) => {
                switch (value) {
                    case "send":
                        firebase.auth().sendPasswordResetEmail(email)
                            .then(() => {
                                swal("¡Enviado!", "Verifica tu correo para restablecer tu contraseña.", "success");
                            })
                            .catch(error => {
                                // Error occurred. Inspect error.code.
                                swal({
                                    title: "¡Atención!",
                                    text: msgError(error.code, error.message),
                                    icon: "info",
                                    button: "Aceptar"
                                });
                            });
                        break;
                }
            });
    }

    render() {
        return (
            <div className="SignIn">
                <Header hideButtonPost={true} />

                <div className="limiter">
                    <div className="container-login100" style={{ paddingTop: '3rem' }}>
                        <div className="wrap-login100">
                            <div className="login100-form-title" style={{ backgroundImage: 'url(./images/5.jpg)' }}>
                                <span className="login100-form-title-1">Iniciar Sesión</span>
                            </div>
                            <form onSubmit={e => e.preventDefault()} className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                    <span className="label-input100">Usuario</span>
                                    <input className="input100" type="email" id="email" onChange={e => this.setState({ email: e.target.value })} defaultValue={this.state.emailForSignIn} placeholder="usuario@codescript.com" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    <span className="label-input100">Contraseña</span>
                                    <input className="input100" type="password" id="password" placeholder="********" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="flex-sb-m w-full p-b-30">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb-remenber-me" type="checkbox" defaultChecked={this.state.checked} />
                                        <label className="label-checkbox100" htmlFor="ckb-remenber-me">Recordarme</label>
                                    </div>
                                    <div>
                                        <a href="#" onClick={this.handleFogotPassword} className="txt1" role="button">¿Olvidaste tu contraseña?</a>
                                    </div>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button onClick={this.handleSubmit} className="login100-form-btn">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
