import React, { Component } from 'react';
import './Freelancers.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import Freelancer from '../../components/freelancer/Freelancer';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class Freelancers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            searchResult: null
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        firebase.database().ref('users/').orderByChild('range')
            .on('value', snapshot => {
                var users = snapshot.val();
                if (users) {
                    this.setState({ users });
                }
            });
    }

    handleSearch = () => {
        var search = document.querySelector("#search-input");
        if(!search) {
            this.setState({ searchResult: null });
            return;
        }

        search = _.trim(search.value);
        if(_.isEmpty(search)) {
            this.setState({ searchResult: null });
            return;
        }

        var searchResult = [];

        var users = this.state.users;
        for (let user in users) {
            if (_.toLower(users[user].displayName).search(_.toLower(search)) !== -1) {
                searchResult.push(users[user]);
            }
        }

        if (Object.entries(searchResult).length > 0) {
            
            console.log(searchResult);
        } else {
            searchResult = null;
        }

        this.setState({ searchResult });
    }

    render() {
        var result = this.state.searchResult;
        var userList = result || this.state.users;
        var users;
        var currentUserId = sessionStorage.getItem("uid");

        if (userList) {
            users = Object.keys(userList).map(user =>
                 user === currentUserId ? "" :
                    <Freelancer key={user} user={userList[user]} />
                
            ).reverse();
        }

        return (
            <div className="Freelancers">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-lg-3 pl-0 pr-0">
                                    <select style={{ borderRadius: 0, border: 0, cursor: 'pointer' }} className="custom-select bg-secondary text-white">
                                        <option>Freelancers</option>
                                    </select>
                                </div>
                                <form style={{ padding: 0 }} onSubmit={e => e.preventDefault()} className="form-inline col-sm my-2 my-lg-0">
                                    <input id="search-input" style={{ borderRadius: 0, border: 0, width: '85%' }} className="form-control mr-sm-0" type="search" placeholder="Buscar" aria-label="Buscar" onChange={this.handleSearch} />
                                    <button onClick={this.handleSearch} className="btn btn-success my-2 my-sm-0" type="button" style={{ borderRadius: 0, width: '15%' }}>Buscar</button>
                                </form>
                            </div>
                            <main className="row my-lg-4">
                                <div className="col-lg-4 mb-2">
                                    <div className="bg-white text-dark" style={{ padding: 15 }}>
                                        <button className="btn btn-outline-secondary btn-block">FILTROS</button>
                                        <div className="d-none d-lg-block">
                                            <label htmlFor="select-acti-pro">Actividad profesional</label>
                                            <select id="select-acti-pro" className="custom-select">
                                                <option>Todas las profesiones</option>
                                            </select>
                                            <label htmlFor="select-skills">Habilidades</label>
                                            <select id="select-skills" className="custom-select" multiple>
                                                <option>Diseño</option>
                                                <option>Programacion</option>
                                            </select>
                                            <label htmlFor="select-geo">Ubicacion</label>
                                            <select id="select-geo" className="custom-select">
                                                <option>Todas las ubicaciones</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <div className="row">
                                        {users}

                                        <div className="col-sm-12" style={{ padding: 20 }}> {/* Pagination */}
                                            <nav aria-label="...">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" tabIndex={-1}>1</a>
                                                    </li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
                <hr className="featurette-divider" />
                <Footer />
            </div>
        );
    }
}

export default Freelancers;
