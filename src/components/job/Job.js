import React, { Component } from 'react';
import './Job.css';
import swal from 'sweetalert';
import _ from 'lodash';
import firebase from 'firebase';
import { lastSeenConverter } from '../../functions/general';
import { msgError } from '../../functions/my-firebase';
import ApplyModal from '../apply_modal/ApplyModal';
import SignUpModal from '../signup_modal/SignUpModal';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            id: null,
            job: {},
            user: {},
            applyed: false,
            mine: false
        };
        this.loadUser = this.loadUser.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
    }

    componentWillMount() {
        var job = this.props.job;
        if (job) {
            this.setState({ job });
            this.loadUser(job.uid);

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
        }

        var id = this.props.id;
        if (id) {
            this.setState({ id });
        }

        var uid = this.props.uid;
        if (uid) {
            this.setState({ uid });
        }
    }

    loadUser = (uid) => {
        firebase.database().ref(`users/${uid}`).once('value')
            .then(user => {
                user = user.val();
                if (user) {
                    this.setState({ user });
                }
            })
            .catch(error => console.log(error));
    }

    handleApply = async () => {
        var uid = this.state.user.uid,
            jobId = this.state.id,
            applicantUid = sessionStorage.getItem("uid");

        if (_.isEmpty(uid) || uid === null) {
            console.log("NO UID");
            return;
        }

        if (_.isEmpty(jobId) || jobId === null) {
            console.log("NO JOBID");
            return;
        }

        if (_.isEmpty(applicantUid) || applicantUid === null || applicantUid === undefined) {
            console.log("NO APPLICANTUID");
            return;
        }

        var timestamp = new Date().getTime();
        var updates = {};
        updates[`/jobs/${jobId}/applicants/${applicantUid}`] = { timestamp };
        updates[`/users/${uid}/postedJobs/${jobId}/applicants/${applicantUid}`] = { timestamp };

        try {
            await firebase.database().ref().update(updates);

            firebase.database().ref(`/jobs/${jobId}/requests`)
                .transaction(currentRank => {
                    if (currentRank) {
                        currentRank++;
                    } else {
                        currentRank = 1;
                    }
                    return currentRank;
                });

            firebase.database().ref(`/users/${uid}/postedJobs/${jobId}/requests`)
                .transaction(currentRank => {
                    if (currentRank) {
                        currentRank++;
                    } else {
                        currentRank = 1;
                    }
                    return currentRank;
                });

            firebase.database().ref(`users/${applicantUid}/applying/${jobId}`).update({ timestamp })
                .catch(error => {
                    console.log(error);
                });

            swal({
                title: "¡Enhorabuena!",
                text: "Haz aplicado para esta propuesta de trabajo.",
                icon: "success",
                button: "Aceptar",
            })
                .then(() => {
                    // window.location.href = "/profile";
                });
            return true;
        }

        catch (error) {
            console.log(error);
            swal({
                title: "¡Atención!",
                text: msgError(error.code, error.message),
                icon: "info",
                button: "Aceptar",
            });
            return false;
        }

    }

    handleCancel = async () => {
        swal({
            title: "Solicitud cancelada",
            text: "Coming soon...",
            icon: "success",
            button: "Aceptar",
        });

        return;

        var uid = this.state.user.uid,
            jobId = this.state.id,
            applicantUid = sessionStorage.getItem("uid");

        if (_.isEmpty(uid) || uid === null) {
            console.log("NO UID");
            return;
        }

        if (_.isEmpty(jobId) || jobId === null) {
            console.log("NO JOBID");
            return;
        }

        if (_.isEmpty(applicantUid) || applicantUid === null || applicantUid === undefined) {
            console.log("NO APPLICANTUID");
            return;
        }

        var timestamp = new Date().getTime();
        var updates = {};
        updates[`/jobs/${jobId}/applicants/${applicantUid}`] = { timestamp };
        updates[`/users/${uid}/postedJobs/${jobId}/applicants/${applicantUid}`] = { timestamp };

        try {
            await firebase.database().ref().update(updates);

            firebase.database().ref(`/jobs/${jobId}/requests`)
                .transaction(currentRank => {
                    if (currentRank) {
                        currentRank++;
                    } else {
                        currentRank = 1;
                    }
                    return currentRank;
                });

            firebase.database().ref(`/users/${uid}/postedJobs/${jobId}/requests`)
                .transaction(currentRank => {
                    if (currentRank) {
                        currentRank++;
                    } else {
                        currentRank = 1;
                    }
                    return currentRank;
                });

            firebase.database().ref(`users/${applicantUid}/applying/${jobId}`).update({ timestamp })
                .catch(error => {
                    console.log(error);
                });

            swal({
                title: "¡Enhorabuena!",
                text: "Haz aplicado para esta propuesta de trabajo.",
                icon: "success",
                button: "Aceptar",
            })
                .then(() => {
                    // window.location.href = "/profile";
                });
            return true;
        }

        catch (error) {
            console.log(error);
            swal({
                title: "¡Atención!",
                text: msgError(error.code, error.message),
                icon: "info",
                button: "Aceptar",
            });
            return false;
        }

    }

    handleOptions = async () => {
        swal({
            title: "Opciones de la Solicitud",
            text: "Coming soon...",
            icon: "success",
            button: "Aceptar",
        });

        return;
    }

    render() {
        var sesion = localStorage.getItem("sesion") === "true" ? true : false;

        var job = this.state.job;
        var category = job.category || "No especificado.",
            subCategory = job.subCategory || "",
            name = job.name || <br />,
            price = job.price || 0,
            size = job.size || "No especificado.",
            description = job.description || "",
            uid = job.uid || "",
            state = job.state || "Evaluando propuestas",
            creationTime = job.creationTime || null,
            requests = job.requests || 0,
            length = job.length || "No especificado";

        var user = this.state.user;
        var displayName = user.displayName || "",
            country = user.country || "RD";

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

        return (
            <div className="Job col-sm-12" style={{ marginBottom: 20 }}>
                <div className="card" style={{ border: 0, borderRadius: 3, boxShadow: '0px 3px 3px #bdbbbb' }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-8 text-left">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <strong style={{ fontSize: '1.15em' }} className="text-dark ml-0 mr-0 mb-0 mt-0"><a style={{ textDecoration: 'none' }} href={`work/${this.props.id}`}>{name}</a></strong>
                                            <p className="text-dark">Publicado: <span className="text-secondary">{postedTime}.</span></p>
                                        </div>
                                    </div>
                                </div>
                                {/*Descripcion*/}
                                <div className="col-lg-12">
                                    {_.isEmpty(description) ? "" : <p style={{ fontSize: '1.05em', margin: 0 }} className="text-black-50">
                                        {description}
                                    </p>}
                                    <div className="mt-3">
                                        <p style={{ fontSize: '1em', margin: 0 }} className="text-dark">Categoría:
                                            <span className="text-muted"> {category}.</span>
                                        </p>
                                        {_.isEmpty(subCategory) ? "" : <p style={{ fontSize: '1em', margin: 0 }} className="text-dark">SubCategoría:
                                            <span className="text-muted"> {subCategory}</span> </p>}
                                        <p style={{ fontSize: '1em', margin: 0 }} className="text-dark">Alcance: <span className="text-muted"> {size}.</span> </p>
                                        <p style={{ fontSize: '1em', margin: 0 }} className="text-dark">Estado: <span className="text-muted"> {state}.</span> </p>
                                    </div>
                                </div>
                                <div className="col-lg-12 my-4">
                                    <div className="row" style={{ paddingLeft: 15 }}>
                                        <div className="col-lg-auto" style={{ padding: 2, width: 'auto' }}>
                                            <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: 2 }} className="text-white bg-primary">SENIOR</p>
                                        </div>
                                        <div className="col-lg-auto" style={{ padding: 2, width: 'auto' }}>
                                            <p style={{ fontSize: '0.9em', margin: 0, padding: '0px 15px', borderRadius: 2 }} className="text-white bg-primary">DEVELOPERS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                    {buttonApply}
                                </div>
                                <div className="col-sm-12 " style={{ marginTop: 5 }}>
                                    <p style={{ margin: 0 }} className="text-dark">Presupuesto:</p>
                                    <p style={{ fontSize: '1.15em' }} className="text-success">{price}</p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Solicitudes: <span className="text-muted">{requests}</span></p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Duración: <span className="text-muted">{length}</span></p>
                                    <p style={{ fontSize: '0.8em', margin: 0, display: 'flex', justifyContent: 'space-between' }} className="text-dark">Contratista: <a href={`/profile/${uid}`} className="text-muted">{displayName}</a></p>
                                    <p style={{ fontSize: '0.8em', display: 'flex', justifyContent: 'space-between' }} className="text-dark">País del contratista: <span className="text-muted">{country}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ApplyModal id={this.state.id} />
                <SignUpModal />
            </div>

        );
    }
}

export default Job;
