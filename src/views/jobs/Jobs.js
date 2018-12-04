import React, { Component } from 'react';
import './Jobs.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { msgError } from '../../functions/my-firebase';
import Job from '../../components/job/Job';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            jobs: null
        };
    }

    componentWillMount() {
        firebase.database().ref('jobs/')
            .on('value', snapshot => {
                var jobs = snapshot.val();
                if (jobs) {
                    this.setState({ jobs });
                }
            });

        var uid = this.props.uid;
        if (uid) {
            this.setState({ uid });
        }
    }

    render() {
        var jobList = this.state.jobs;
        var jobs;
        var uid = this.state.uid;

        if (jobList) {
            jobs = Object.keys(jobList).map(job =>
                <Job key={job} job={jobList[job]} id={job} uid={uid} />
            ).reverse();
        }

        return (
            <div className="Jobs" style={{ paddingTop: '5rem' }}>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-lg-3 pl-0 pr-0">
                                    <select style={{ borderRadius: 0, border: 0, cursor: 'pointer' }} className="custom-select bg-secondary text-white">
                                        <option>Trabajos</option>
                                    </select>
                                </div>
                                <form style={{ padding: 0 }} className="form-inline col-sm my-2 my-lg-0">
                                    <input style={{ borderRadius: 0, border: 0, width: '85%' }} className="form-control mr-sm-0" type="search" placeholder="Buscar" aria-label="Buscar" />
                                    <button className="btn btn-success my-2 my-sm-0" type="submit" style={{ borderRadius: 0, width: '15%' }}>Search</button>
                                </form>
                            </div>
                            <main className="row my-lg-4">
                                <div className="col-lg-4 mb-2">
                                    <div className="bg-white text-dark" style={{ padding: 15 }}>
                                        <button className="btn btn-outline-secondary btn-block">FILTROS</button>
                                        <div className="d-none d-lg-block">
                                            {/* <button className="btn btn-outline-secondary btn-block"  data-toggle="collapse" data-target="#leftSideFilters" aria-expanded="true" aria-controls="leftSideFilters" >FILTROS</button>
                                        <div className="collapse navbar-collapse col-lg-block" id="leftSideFilters"> */}
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
                                        {jobs}
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

export default Jobs;
