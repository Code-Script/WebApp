import React, { Component } from 'react';
import './SubCategory.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/firebase_errors';

class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        
    }

    render() {
        return (
            <div className="SubCategory">
                <Header />
                <div classname="container" >
                    SubCategory
                </div>
                <Footer />
            </div>
        );
    }
}

export default SubCategory;
