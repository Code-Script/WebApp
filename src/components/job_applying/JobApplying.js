import React, { Component } from 'react';
import './JobApplying.css';
import _ from 'lodash';
import swal from 'sweetalert';
import firebase from 'firebase';
import { lastSeenConverter } from '../../functions/general';

class JobApplying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {}
        };
    }

    componentWillMount() {
        let jobId = this.props.job;
        if (jobId) {
            firebase.database().ref(`jobs/${jobId}`).on('value', snapshot => {
                var job = snapshot.val();
                if (job) {
                    this.setState({ job });
                }
            });
        }
    }

    render() {
        var job = this.state.job;
        return (
            <div className="JobApplying p-2">
                {/* <br /> */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <h5><a style={{ textDecoration: 'none' }} href={`work/${this.props.job}`}>{job.name}</a></h5>
                            <p>Publicado: <span>{_.toLower(lastSeenConverter(job.creationTime))}.</span></p>
                            <p>Propuestas: <span>{job.requests || 0}.</span></p>
                            <p>Estado: <span>{job.state || "Evaluando propuestas"}.</span></p>
                        </div>
                    </div>
                    <div className="options">
                        {/* <span data-content="Right?" data-toggle="popover" data-trigger="focus" title="Opciones" data-container="body" data-placement="bottom">
                            <i className="fas fa-ellipsis-v"></i>
                        </span> */}
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Ver</a>
                                <a className="dropdown-item" href="#">Cancelar</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default JobApplying;