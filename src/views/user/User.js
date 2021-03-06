import React, { Component } from 'react';
import './User.css';
import firebase from 'firebase';
import _ from 'lodash';
import { convertDate, lastSeenConverter } from '../../functions/general';
import { getStars } from '../../functions/stars';
import JobHiring from '../../components/job_hiring/JobHiring';
import JobApplying from '../../components/job_applying/JobApplying';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            profile: {
                description: "",
                slogan: ""
            }
        };
    }

    componentWillMount() {
        let uid = localStorage.getItem("uid");
        let uidFromUrl = this.props.match.params.id;

        if (_.isEqual(uid, uidFromUrl)) {
            window.location.href = "/profile";
            return;
        }

        if (!uidFromUrl) {
            return;
        }

        uid = uidFromUrl;

        if (uid !== null && uid !== undefined && !_.isEmpty(uid)) {
            this.setState({ uid });

            firebase.database().ref(`users/${uid}`).on('value', (snapshot) => {
                var profile = snapshot.val();
                if (profile) {
                    this.setState({ profile });
                    let displayName = profile.displayName || null;
                    displayName = displayName ? `| ${displayName}` : "";
                    document.title = `NetJob ${displayName}`;
                }
            });

        }
    }

    render() {
        var user = this.state.profile;
        var profile = this.state.profile;

        var freelancer = profile.freelancer || {};

        var displayName = user.displayName || <br />;
        var slogan = user.slogan || "No tiene frase";
        var price = freelancer.price || 0.00;
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

        var descritionCard = <div className="col-12 about-me pl-0 pr-0">{description}</div>;

        var name = <div>
            <div className="h1">
                {displayName}
            </div>
            <h5 className="mb-2 text-muted">
                {slogan}
            </h5>
        </div>;

        var jobList = profile.postedJobs;
        var jobs;
        if (jobList) {
            jobs = Object.keys(jobList).map(job =>
                <JobHiring key={job} job={jobList[job]} id={job} dropdown={false} />
            ).reverse();
        }

        // var applyingList = this.state.applyingList;
        var applyingList = profile.applying
        var applying;
        if (applyingList) {
            applying = Object.keys(applyingList).map(job =>
                <JobApplying key={job} job={job} dropdown={false} />
            ).reverse();
        }

        var range = profile.range || 0;
        var stars = getStars(range).map((star, i) =>
            <i className="material-icons" key={i}>{star}</i>
        );

        return (
            <div className="User">
                <Header />
                <main role="main">
                    <div className="container" style={{ paddingTop: '4.5rem' }}>

                        <div className="ProfileAsClient">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 col-lg-11">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-4 col-md-5 col-lg-3 text-center">
                                                    <div className="profile-photo">
                                                        <img id="photoProfile" className="img-fluid" src={photoURL} style={{ border: "1px solid #dee2e6" }}></img>
                                                        <div className="justify-content-center">
                                                            {/* <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.handleUpdatePhoto} className="file-input"></input> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8 col-md-7 col-lg-9">
                                                    <div className="d-flex justify-content-between">
                                                        {name}
                                                        <div className="pr-2">
                                                            {/* <img onClick={() => this.setState({ editGeneral: true })} style={{ maxWidth: 37, cursor: 'pointer' }} src="./images/icon_edit.png" className="img-fluid"></img> */}
                                                        </div>
                                                    </div>
                                                    <div className="row text-left">
                                                        <div className="col-3 profile-stars">
                                                            <span className="stars-bg d-inline">
                                                                <span className="stars-fill" style={{ userSelect: "none" }}>
                                                                    {stars}
                                                                    {/* <i className="material-icons">star</i>
                                                        <i className="material-icons">star</i>
                                                        <i className="material-icons">star_half</i>
                                                        <i className="material-icons">star_border</i>
                                                        <i className="material-icons">star_border</i> */}
                                                                </span>
                                                            </span>
                                                            {/* <span>
                                                    <p className="stars-caption d-inline mr-2">
                                                        <span className="average">0</span>
                                                        <span> / </span>
                                                        <span className="max">5</span>
                                                    </p>
                                                </span> */}
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
                                    <br />
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="row feature">
                                                    <div className="col-12 d-flex justify-content-between">
                                                        <div className="">
                                                            <h2>Sobre este usuario</h2>
                                                        </div>
                                                        <div className="pr-2">
                                                            {/* <img onClick={() => this.setState({ editDescription: true })} style={{ maxWidth: 37, cursor: 'pointer' }} src="./images/icon_edit.png" className="img-fluid"></img> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 about-me">{descritionCard}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="row feature">
                                                    <div className="col-12">
                                                        <div className="">
                                                            <h2>Trabajos en los que está contratando</h2>
                                                        </div>
                                                        {/* <div className="pr-2">
                                                <img onClick={() => this.setState({ editDescription: true })} style={{ maxWidth: 37, cursor: 'pointer' }} src="./images/icon_edit.png" className="img-fluid"></img>
                                            </div> */}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="">
                                                            {jobs}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="row feature">
                                                    <div className="col-12">
                                                        <div className="">
                                                            <h2>Trabajos en los que está aplicando</h2>
                                                        </div>
                                                        {/* <div className="pr-2">
                                                <img onClick={() => this.setState({ editDescription: true })} style={{ maxWidth: 37, cursor: 'pointer' }} src="./images/icon_edit.png" className="img-fluid"></img>
                                            </div> */}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="">
                                                            {applying}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
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

export default User;