import React, { Component } from 'react';
import './SubCategories.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/firebase_errors';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class SubCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {

        // var categories = categories.map(category =>
        //     <div></div>
        // );

        return (
            <div className="SubCategories">
                <Header />
                <div className="container" >
                    <div className="row">
                        <div className="col-12" style={{border:"solid 1px black"}}>

                        </div>
                    </div>
                </div>
                <hr className="featurette-divider" />
                <Footer />
            </div>
        );
    }
}

export default SubCategories;
