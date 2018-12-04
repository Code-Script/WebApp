import React, { Component } from 'react';
import './Header.css';
import SignUpModal from '../signup_modal/SignUpModal';
window.$ = window.jQuery = require('jquery');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
        this.handlePostNotSession = this.handlePostNotSession.bind(this);
    }

    handlePostNotSession = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/post' });
        window.$('#SignUpModal').modal('show');
        // data-toggle="modal" data-target="#SignUpModal"
        // $('#myModal').modal('toggle');
        // $('#myModal').modal('hide');
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
            buttonPost = <a role="button" aria-disabled="true" href="/post" className="btn btn-success my-2 my-sm-0">PUBLICAR PROYECTO</a>;
            buttonSignUpOrProfile = <button className="btn btn-outline-info mr-2" role="button" onClick={() => window.location.href = '/profile'}>MI PERFIL</button>;
        } else {
            buttonPost = <a role="button" aria-disabled="true" href="/post" className="btn btn-success my-2 my-sm-0" onClick={this.handlePostNotSession}>PUBLICAR PROYECTO</a>;
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
