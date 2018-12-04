import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="container">
                <p className="float-right"><a href="#">Volver arriba</a></p>
                <p>© 2017-2018 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </footer>
        );
    }
}

export default Footer;
