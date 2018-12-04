import React, { Component } from 'react';
import './HowItWorks.css';
import firebase from 'firebase';
import _ from 'lodash';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class HowItWorks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="HowItWorks">
                <Header />
                <main role="main">
                    <div className="container padding-below">
                        <div className="row justify-content-center" style={{ paddingTop: '2.5rem' }}>
                            <div className="col-sm-12 col-lg-11">
                                AQUI SE VA A MOSTRAR COMO FUNCIONA LA PLATAFORMA. 
                            </div>
                        </div>
                    </div>
                </main>
                <hr className="featurette-divider" />
                <Footer />
            </div>
        );
    }
}

export default HowItWorks;