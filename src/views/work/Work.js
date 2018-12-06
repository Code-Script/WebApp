import React, { Component } from 'react';
import './Work.css';
import firebase from 'firebase';
import _ from 'lodash';
import swal from 'sweetalert';
import { convertDate, lastSeenConverter } from '../../functions/general';
import { getStars } from '../../functions/stars';
import { msgError } from '../../functions/my-firebase';
import ApplyModal from '../../components/apply_modal/ApplyModal';
import SignUpModal from '../../components/signup_modal/SignUpModal';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import JobApplicants from '../../components/job_applicants/JobApplicants';

class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {},
            user: {},
            applyed: false,
            mine: false
        };
    }

    componentWillMount() {
        var id = this.props.match.params.id;
        console.log(id);
        if (id) {
            this.setState({ id });
            firebase.database().ref(`jobs/${id}`).on('value', snapshot => {
                var job = snapshot.val();
                if (job) {
                    this.setState({ job });
                    let userId = sessionStorage.getItem("uid");
                    var applicants = job.applicants;

                    _.mapKeys(applicants, (value, key) => {
                        if (key === userId) {
                            this.setState({ applyed: true });
                        }
                    });

                    if (userId === job.uid) {
                        this.setState({ mine: true });
                    }

                    firebase.database().ref(`users/${job.uid}`).on('value', snapshot => {
                        var user = snapshot.val();
                        if (user) {
                            this.setState({ user });
                        }
                    });
                } else {
                    swal({
                        title: "Ha ocurrido un error",
                        text: "La propuesta de trabajo no fue encontrada.",
                        icon: "error",
                        button: "Aceptar",
                    })
                        .then(() => {
                            //   window.location.href = "/profile";
                            // window.history.back();
                        });
                }
            });
        } else {
            // document.referrer;
            // console.log(document.referrer);
            // window.history.back();
        }
    }

    render() {
        var sesion = localStorage.getItem("sesion") === "true" ? true : false;
        var currentUserId = sessionStorage.getItem("uid");

        var job = this.state.job;
        var category = job.category || "No especificado.",
            subCategory = job.subCategory || "",
            name = job.name || <br />,
            price = job.price || 0,
            size = job.size || "No especificado.",
            description = job.description || "",
            uid = job.uid || "",
            state = job.state,
            creationTime = job.creationTime || null,
            requests = job.requests || 0,
            length = job.length || "No especificado";

        var user = this.state.user;
        var displayName = user.displayName || "",
            country = user.country || "RD",
            slogan = user.slogan || "No tiene frase";

        var postedTime = _.toLower(lastSeenConverter(creationTime));

        var buttonApply;
        if (sesion) {
            if (this.state.applyed) {
                buttonApply = <button style={{ width: '100%' }} className="btn btn-danger" onClick={this.handleCancel}>CANCELAR</button>;
            } else {
                if (this.state.mine) {
                    buttonApply = <button style={{ width: '100%' }} className="btn btn-danger" onClick={this.handleOptions}>OPCIONES</button>;
                } else {
                    buttonApply = <button style={{ width: '100%' }} className="btn btn-danger" onClick={this.handleApply}>SOLICITAR</button>;
                }

            }

            // buttonApply = <button style={{ width: '100%' }} className="btn btn-danger" data-toggle="modal" data-target="#ApplyModal">SOLICITAR</button>;
        } else {
            buttonApply = <button style={{ width: '100%' }} className="btn btn-danger" data-toggle="modal" data-target="#SignUpModal">SOLICITAR</button>;
        }


        var user = this.state.user;
        var profile = this.state.user;

        var freelancer = profile.freelancer || {};

        // var price = freelancer.price || 0.00;
        var score = freelancer.score || 0;
        var finished = freelancer.finished || 0;
        var country = profile.country || "Republica Dominicana";

        var postedJobsCount = profile.postedJobsCount || 0;
        var finishedJobsCount = profile.finishedJobsCount || 0;

        var creationTime = profile.creationTime;
        var creation = convertDate(creationTime);
        creationTime = creationTime ? `${creation.monthLetter}, ${creation.year}` : "";
        var lastSeen = profile.lastSeen;
        lastSeen = lastSeenConverter(lastSeen);

        var description = profile.description || "";
        var photoURL = user.photoURL || "data:image/png;base64,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";

        var range = profile.range || 0;
        var stars = getStars(range).map((star, i) =>
            <i className="material-icons" key={i}>{star}</i>
        );

        var applicantList = job.applicants
        var applicants;
        if (applicantList) {
            applicants = Object.keys(applicantList).map(user =>
                <JobApplicants key={user} user={user} id={this.state.id} job={job} />
            ).reverse();
        }

        // var name;
        // if(currentUserId === uid) {
        //     name = displayName;
        // } else {
        //     name = <a href={`/profile/${uid}`} style={{ textDecoration: 'none' }}>{displayName}</a>;
        // }

        return (
            <div className="Work">
                <Header />
                <main role="main">
                    <div className="container" style={{ paddingTop: '4.5rem' }}>

                        <div className="container">
                            <div className="row mt-2">

                                {currentUserId === uid ? "" :
                                    <div className="col-sm-12 mb-2">
                                        <div className="card" style={{ border: 0, borderRadius: 0, boxShadow: '0px 3px 3px #bdbbbb' }}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-4 col-md-5 col-lg-3 text-center">
                                                        <div className="profile-photo">
                                                            <img id="photoProfile" className="img-fluid" src={photoURL} style={{ border: "1px solid #dee2e6" }}></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-md-7 col-lg-9">
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <div className="h1">
                                                                    <a href={`/profile/${uid}`} style={{ textDecoration: 'none' }}>{displayName}</a>
                                                                </div>
                                                                <h5 className="mb-2 text-muted">
                                                                    {slogan}
                                                                </h5>
                                                            </div>
                                                            <div className="pr-2">
                                                                {buttonApply}
                                                            </div>
                                                        </div>
                                                        <div className="row text-left">
                                                            <div className="col-3 profile-stars">
                                                                <span className="stars-bg d-inline">
                                                                    <span className="stars-fill" style={{ userSelect: "none" }}>
                                                                        {stars}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="col-9">
                                                                <span className="country">
                                                                    <a href="https://es.wikipedia.org/wiki/Rep%C3%BAblica_Dominicana">{country}</a>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="row text-left" style={{ marginTop: "15px" }}>
                                                            <div className="col-4 pb-1">
                                                                Proyectos publicados:
                                                <span className="font-weight-bold"> {postedJobsCount}</span>
                                                            </div>
                                                            <div className="col-8 pb-1">
                                                                Último login:
                                                <span className="font-weight-bold"> {lastSeen}</span>
                                                            </div>
                                                        </div>

                                                        <div className="row text-left">
                                                            <div className="col-4 pb-1">
                                                                Proyectos terminados:
                                                <span className="font-weight-bold"> {finishedJobsCount}</span>
                                                            </div>
                                                            <div className="col-8 pb-1">
                                                                Registrado desde:
                                                <span className="font-weight-bold"> {creationTime}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }

                                <div className="col-sm-12" style={{ marginBottom: '20px' }}>
                                    <div className="card" style={{ border: 0, borderRadius: 0, boxShadow: '0px 3px 3px #bdbbbb' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="col-lg-12">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <strong style={{ fontSize: '1.5em' }} className="text-dark ml-0 mr-0 mb-0 mt-0">{name}</strong>
                                                                <p className="text-dark">Publicado: <span className="text-secondary">{postedTime}.</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <strong style={{ fontSize: '1em' }}>Descripción: </strong>
                                                        <p style={{ fontSize: '1em', margin: 0 }} className="text-black-50 mt-0">{description}</p>
                                                        <div className="mt-3">
                                                            <strong style={{ fontSize: '1em' }}>Consideraciones: </strong>
                                                            <p style={{ fontSize: '1em' }} className="text-dark m-0 mt-0">Categoría: <span className="text-muted">{category}.</span> </p>
                                                            {/* <p style={{ fontSize: '1em' }} className="text-dark m-0">SubCetegoría: <span className="text-muted">Programacion Web</span> </p> */}
                                                            <p style={{ fontSize: '1em' }} className="text-dark m-0">Alcance: <span className="text-muted">{size}.</span> </p>
                                                            <p style={{ fontSize: '1em' }} className="text-dark m-0">Estado: <span className="text-muted">{state}.</span> </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 my-4">
                                                        <div className="row" style={{ paddingLeft: '15px' }}>
                                                            <div className="col-lg-auto" style={{ padding: '2px', width: 'auto' }}>
                                                                <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: '2px' }} className="text-white bg-primary">SENIOR</p>
                                                            </div>
                                                            <div className="col-lg-auto" style={{ padding: '2px', width: 'auto' }}>
                                                                <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: '2px' }} className="text-white bg-primary">DEVELOPERS</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="col-sm-12 " style={{ marginTop: '5px' }}>
                                                        {/* { currentUserId !== uid ? "" : <div className="pr-2">{buttonApply}</div>} */}
                                                        <p style={{ fontSize: '1em', margin: '0px' }} className="text-dark">Presupuesto:</p>
                                                        <p style={{ fontSize: '1.3em' }} className="text-success">{price}</p>
                                                        <p style={{ fontSize: '0.9em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Solicitudes: <span className="text-muted">{requests}</span> </p>
                                                        <p style={{ fontSize: '0.9em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Duración: <span className="text-muted">{length}</span></p>
                                                        {/* <p style={{ fontSize: '0.9em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Contratista: <a href="#!" className="text-muted">Luis Alimaña</a></p> */}
                                                        {/* <p style={{ fontSize: '0.9em', display: 'flex', justifyContent: 'space-between' }} className="text-dark">Pais del contratista: <span className="text-muted">{country}</span></p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-12" style={{ marginBottom: '20px' }}>
                                    <div className="card" style={{ border: 0, borderRadius: 0, boxShadow: '0px 3px 3px #bdbbbb' }}>
                                        <div className="card-body">
                                            <div>
                                                <div className="row feature">
                                                    <div className="col-12">
                                                        <div className="">
                                                            <h2>Freelancers que están aplicando</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="">
                                                            {applicants}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


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

export default Work;