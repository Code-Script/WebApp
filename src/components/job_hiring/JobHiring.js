import React, { Component } from 'react';
import './JobHiring.css';
import _ from 'lodash';
import swal from 'sweetalert';
import { convertDate, lastSeenConverter } from '../../functions/general';

class JobHiring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {}
        };
    }

    componentWillReceiveProps() {
        // if (this.props.job) {
        //     this.setState({ job: this.props.job });
        //     console.log(this.props.job);
        // }
        console.log('componentWillReceiveProps');
    }

    componentWillMount() {
        if (this.props.job) {
            this.setState({ job: this.props.job });
        }
    }

    render() {
        var job = this.state.job;
        return (
            <div className="JobHiring p-2">
                {/* <br /> */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <h5>{job.name}</h5>
                            <p>Publicado: <span>{_.toLower(lastSeenConverter(job.creationTime))}</span></p>
                            <p>Propuestas: <span>{job.offersCount || 0}</span></p>
                            <p>Estado: <span>{job.state || "Evaluando"}</span></p>
                        </div>
                    </div>
                    <div className="options">
                        <span data-content="Right?" data-toggle="popover" data-trigger="focus" title="Opciones" data-container="body" data-placement="bottom">
                            <i className="fas fa-ellipsis-v"></i>
                        </span>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default JobHiring;