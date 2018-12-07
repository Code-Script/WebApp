import React, { Component } from 'react';
import './Category.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/firebase_errors';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postJob: false
        };
        this.handleRedirectToCategory = this.handleRedirectToCategory.bind(this);
        this.handleSeeAllCategories = this.handleSeeAllCategories.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.postJob === true) {
            this.setState({ postJob: true });
        }
    }

    handleSeeAllCategories = () => {
        window.location.href = "/freelancers";
    }

    handleRedirectToCategory = (e) => {
        if (this.state.postJob) {
            e.preventDefault();
        } else {
            window.location.href = e.target.href;
        }
    }

    render() {
        var postJob = this.state.postJob;

        var categories_json = [
            {
                title: 'Programación para móviles',
                href: 'mobile-developer',
                class: 'fas fa-tablet-alt'
            },
            {
                title: 'Programación web',
                href: 'web-developer',
                class: 'fas fa-code'
            },
            {
                title: 'Diseño de logo',
                href: 'logo',
                class: 'fab fa-fantasy-flight-games'
            },
            {
                title: 'Diseño web',
                href: 'web-designer',
                class: 'fas fa-money-check'
            },
            {
                title: 'Redacción de artículos',
                href: 'writer',
                class: 'fas fa-font'
                // far fa-edit
            },
            {
                title: 'E-commerce',
                href: 'e-commerce',
                class: 'fas fa-shopping-cart'
            },
            {
                title: 'Publicidad en Google, Facebook',
                href: 'ad',
                class: 'fas fa-chart-line'
            },
            {
                title: 'Ilustraciones',
                href: '#',
                class: 'fas fa-paint-brush'
            },
            {
                title: 'WordPress',
                href: 'wordpress',
                class: 'fab fa-wordpress'
            },
            {
                title: 'Contenido para sitios web',
                href: '#',
                class: 'fas fa-globe'
                // class: 'fas fa-drafting-compass'
            },
            {
                title: 'Crear o editar video',
                href: '#',
                // class: 'fas fa-film'
                class: 'fas fa-magic'
            },
            {
                title: 'Servicios generales',
                href: 'personal-services',
                class: 'fas fa-user-tie'
            }
        ];

        // {
        //     title: postJob ? 'Servicios personales' : 'Otras categorías',
        //     href: '#',
        //     class: postJob ? 'fas fa-user-tie' : 'fas fa-ellipsis-h'
        // }

        if (!_.isEmpty(categories_json) && categories_json.length > 0) {
            var categories = categories_json.map((category) =>
                <div key={category.title} className="col-6 col-md-4 col-lg-3 col-xl-2" >
                    {/* <a id={`/${category.href}`} href={`/${category.href}`} onClick={this.handleRedirectToCategory}> */}
                    <a id={category.href} href={`/${category.href}`} onClick={e => e.preventDefault()}>
                        <div className="category-item">
                            <i className={`${category.class} col-12 category-i`}></i>
                            <p className="col-12 category-p" style={{}}>{category.title}</p>
                        </div>
                    </a>
                </div>
            );
        }

        return (
            <div className="Category">
                <div className="container" >
                    <div className="row d-flex justify-content-center" style={{ textAlign: 'center' }}>
                        {categories}
                    </div>
                    {postJob === true ?
                        "" :
                        <div className="buttonSkills">
                            <center><button type="button" onClick={this.handleSeeAllCategories} className="btn btn-outline-primary col-md-2">Todos los Freelancers</button></center>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default Category;
