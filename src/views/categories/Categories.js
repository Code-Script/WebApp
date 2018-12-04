import React, { Component } from 'react';
import './Categories.css';
import swal from 'sweetalert';
import _ from 'lodash';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Category from '../../components/category/Category';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="Categories">
                <Header />
                <main role="main" className="container">
                    <h1 className="display-6">Encuentra los mejores profesionales por sus áreas</h1>
                    <br />
                    <Category />
                    <hr className="featurette-divider" />
                </main>
                <Footer />
            </div>
        );
    }
}

export default Categories;
