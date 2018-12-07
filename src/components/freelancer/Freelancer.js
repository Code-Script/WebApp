import React, { Component } from 'react';
import './Freelancer.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import HireModal from '../hire_modal/HireModal';
import { convertDate, lastSeenConverter } from '../../functions/general';
import { getStars } from '../../functions/stars';
window.$ = window.jQuery = require('jquery');

class Freelancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            currentUserId: null,
            currentUser: null,
            currentUserPosts: {}
        };
    }

    componentWillMount() {
        var user = this.props.user;
        if (user) {
            this.setState({ user });
        }

        var currentUserId = sessionStorage.getItem("uid");
        if (currentUserId) {
            this.setState({ currentUserId });
            firebase.database().ref(`users/${currentUserId}/postedJobs`).on('value', snapshot => {
                var currentUserPosts = snapshot.val();
                if (currentUserPosts) {
                    this.setState({ currentUserPosts }); 
                }
            });
        }

    }

    handleHire = () => {
        // data-toggle="modal" data-target="#HireModal"
        var jobs = this.state.currentUserPosts || null;
        if(_.isEmpty(jobs) || jobs === null || jobs === {}) {
            swal({
                title: "No tienes propuestas activas",
                text: "Para contratar a este freelancer debe tener al menos un trabajo publicado.",
                icon: "info",
                button: "Aceptar",
            })
            return;
        }
        window.$('#HireModal').modal('show');
    }

    render() {
        var user = this.state.user;
        var freelancer = user.freelancer || {};

        var uid = user.uid || "";
        var price = freelancer.price || 0.00;
        var score = freelancer.score || 0;
        var finished = freelancer.finished || 0;
        var country = user.country || "RD";
        var description = user.description || <br />;
        var slogan = user.slogan || "No tiene frase";
        var postedJobsCount = user.postedJobsCount,
            finishedJobsCount = user.finishedJobsCount,
            creationTime = user.creationTime;

        var postedJobsCount = user.postedJobsCount || 0;
        var finishedJobsCount = user.finishedJobsCount || 0;

        var creationTime = user.creationTime;
        var creation = convertDate(creationTime);
        creationTime = creationTime ? `${creation.monthLetter}, ${creation.year}` : "";
        var lastSeen = user.lastSeen;
        lastSeen = lastSeenConverter(lastSeen);

        var range = user.range || 0;
        var stars = getStars(range).map((star, i) =>
            <i className="material-icons" key={i}>{star}</i>
        );

        var photoURL = user.photoURL || "data:image/png;base64,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";

        return (
            <div className="Freelancer col-sm-12" style={{ marginBottom: 20 }}>
                <div className="card" style={{ border: 0, borderRadius: 3, boxShadow: '0px 3px 3px #bdbbbb' }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="ml-3 mr-3">
                                            <img style={{ width: 65, height: 65, border: "1px solid #dee2e6" }} src={photoURL} alt={user.displayName || ""} className="img-fluid rounded" />
                                        </div>
                                        <div className="col" style={{ padding: 0 }}>
                                            <a href={`/profile/${uid}`} style={{ textDecoration: 'none' }}><p style={{ fontSize: '1.3em', margin: 0 }}>{user.displayName || <br />}</p></a>
                                            <p style={{ fontSize: '0.85em', opacity: '0.5' }} className="text-secondary">{slogan}</p>
                                        </div>
                                    </div>
                                </div>
                                {/*Descripcion*/}
                                <div className="col-lg-12">
                                    <p style={{ fontSize: '1.15em', margin: 0 }} className="text-black-50 mt-2">
                                        {description}
                                    </p>
                                </div>
                                <div className="col-lg-12 my-4">
                                    <div className="row" style={{ paddingLeft: 15 }}>
                                        {/* <div className="col-lg-auto" style={{ padding: 2, width: 'auto' }}>
                                            <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: 2 }} className="text-white bg-primary">SENIOR</p>
                                        </div>
                                        <div className="col-lg-auto" style={{ padding: 2, width: 'auto' }}>
                                            <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: 2 }} className="text-white bg-primary">DEVELOPERS</p>
                                        </div> */}
                                        <div className="row text-left mt-0 pt-0">
                                            <div className="col-12 pb-1">
                                                Proyectos publicados:
                                                <span className="font-weight-bold"> {postedJobsCount}</span>
                                            </div>
                                            <div className="col-12 pb-1">
                                                Último login:
                                                <span className="font-weight-bold"> {lastSeen}</span>
                                            </div>
                                        </div>

                                        <div className="row text-left">
                                            <div className="col-12 pb-1">
                                                Proyectos terminados:
                                                <span className="font-weight-bold"> {finishedJobsCount}</span>
                                            </div>
                                            <div className="col-12 pb-1">
                                                Registrado desde:
                                                <span className="font-weight-bold"> {creationTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                    <button style={{ width: '100%' }} className="btn btn-danger" onClick={this.handleHire}>CONTRATAR</button>
                                </div>
                                <div className="col-sm-12" style={{ marginTop: 5 }}>
                                    <p style={{ margin: 0 }} className="text-dark">Por hora:</p>
                                    <p style={{ fontSize: '1.3em' }} className="text-success">{`RD$${price}`}</p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Puntuación: <span className="text-muted">{score}</span> </p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Proyectos realizados: <span className="text-muted">{finished}</span></p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">País: <a href="https://es.wikipedia.org/wiki/Rep%C3%BAblica_Dominicana" className="text-muted">{country}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HireModal user={user} jobs={this.state.currentUserPosts} />
            </div>

        );
    }
}

export default Freelancer;
