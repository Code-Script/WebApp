import React, { Component } from 'react';
import './HireModal.css';
import SignUpModal from '../signup_modal/SignUpModal';
import firebase from 'firebase';
window.$ = window.jQuery = require('jquery');

class HireModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            jobs: {},
            name: "Elige una propuesta",
            note: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        var user = this.props.user;
        var jobs = this.props.jobs;

        if (user) {
            this.setState({ user });
        }

        if (jobs) {
            this.setState({ jobs });
        }
    }

    handleSubmit = () => {
        var sesion = localStorage.getItem("sesion") === 'true' ? true : false;
        if(!sesion) {
            window.$('#SignUpModal').modal('show');
            return;
        }

        var name = this.state.name;
        var note = this.state.note;

        if(name === "Elige una propuesta") {
            return;
        }

        var currentUserId = sessionStorage.getItem("uid");
        var uid = this.state.user.uid;
        firebase.database().ref(`users/${currentUserId}/hiringUsers`).update({ name: {uid, job: name} });
    }

    render() {
        var user = this.state.user;
        var jobs = this.state.jobs;

        var disabled = this.state.name === "Elige una propuesta" ? "disabled" : "";
        
        return (
            <div className="modal fade" id="HireModal" tabIndex={-1} role="dialog" aria-labelledby="HireModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="HireModalCenterTitle">Contratar a {user.displayName || "freelancer"}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-11">
                                    Seleccione el nombre del proyecto: 
                                    <select className="form-control form-control-lg" onChange={e => this.setState({ name: e.target.value })} value={this.state.name}>
                                        <option value={"Elige una propuesta"} disabled>Elige una propuesta</option>
                                        {Object.keys(jobs).map(job => <option key={job} value={job}>{jobs[job].name}</option>)}
                                    </select>
                                </div>
                                <div className="col-12"></div>
                                {/* <div className="col-sm-6">
                                    <select className="custom-select">
                                        <option value={0} disabled selected>Elige una sub-categoria</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div> */}
                                {/* <div className="col-sm-12 input-group mt-3 mb-3">
                                    <input type="text" placeholder="Nombre del proyecto" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                </div> */}
                                <div className="col-sm-12 form-group mb-3">
                                    <label htmlFor="exampleFormControlTextarea1">Nota: </label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} minLength={3} onChange={e => this.setState({ note: e.target.value })} value={this.state.note} />
                                </div>
                                {/* <div className="col-sm-12 input-group mt-3 mb-3">
                                    <label htmlFor="customRange1">Rango de precio</label>
                                    <input type="range" className="custom-range" id="customRange1" />
                                </div> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={`btn btn-secondary ${disabled}`} data-dismiss="modal" onClick={this.handleSubmit}>ENVIAR SOLICITUD</button>
                        </div>
                    </div>
                </div>
                <SignUpModal />
            </div>
        );
    }
}

export default HireModal;