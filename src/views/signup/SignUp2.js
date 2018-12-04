import React, { Component } from 'react';
import './SignUp.css';
// import './util.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/firebase_errors';
import Header from '../../components/header/Header';
 
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFogotPassword = this.handleFogotPassword.bind(this);
    }

    handleSubmit = () => {
        let email = _.trim(document.querySelector('#username').value);
        let password = _.trim(document.querySelector('#password').value);

        firebase.auth().signInWithEmailAndPassword(email, password)
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
        swal("Help me!", "He olvidado la contraseña.");
    }

    render() {
        return (
            <div className="SignUp">
                <Header />
                <div className="limiter">
                    <div className="container-login100" style={{paddingTop: '3rem'}}>
                        <div className="wrap-login100">
                            <div className="login100-form-title" style={{ backgroundImage: 'url(./images/6.jpeg)' }}>
                                <span className="login100-form-title-1">Registrate</span>
                            </div>
                            <form onSubmit={e => e.preventDefault()} className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                    {/* <span className="label-input100">Usuario</span> */}
                                    <input className="input100" type="text" name="username" id="username" placeholder="usuario@codescript.com" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    {/* <span className="label-input100">Contraseña</span> */}
                                    <input className="input100" type="password" name="pass" id="password" placeholder="********" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="flex-sb-m w-full p-b-30">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <label className="label-checkbox100" htmlFor="ckb1">Recordarme</label>
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

export default SignUp;
