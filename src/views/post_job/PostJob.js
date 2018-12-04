import React, { Component } from 'react';
import './PostJob.css';
import swal from 'sweetalert';
import _ from 'lodash';
import { msgError } from '../../functions/my-firebase';
import firebase from 'firebase';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SelectCategory from '../../components/post_job_steps/select_category/SelectCategory';
import Name from '../../components/post_job_steps/name/Name';
import PriceAndSize from '../../components/post_job_steps/price_size/PriceAndSize';
import Description from '../../components/post_job_steps/description/Description';
import Publish from '../../components/post_job_steps/publish/Publish';
import UploadFiles from '../../components/post_job_steps/upload_files/UploadFiles';

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      category: "",
      subCategory: null,
      name: "",
      price: "",
      size: "",
      description: "",
      currentComponent: 'SelectCategory'
    };
    this.setCategory = this.setCategory.bind(this);
    this.goToStep = this.goToStep.bind(this);
    this.setName = this.setName.bind(this);
    this.setPriceAndSize = this.setPriceAndSize.bind(this);
    this.submit = this.submit.bind(this);
  }

  UNSAFE_componentWillReceiveProps() {
    // console.log(this.state);
    let uid = this.props.uid;
    if (uid) {
      this.setState({ uid });
    }
  }

  goToStep = (step) => {
    this.setState({ currentComponent: step });
  }

  setCategory = (category) => {
    this.setState({ category });
  }

  setName = (name) => {
    this.setState({ name });
  }

  setPriceAndSize = (data) => {
    this.setState({ size: data.size });
    this.setState({ price: data.price });
  }

  setDescription = (description) => {
    this.setState({ description });
    // this.submit();
  }

  submit = async () => {
    var category = _.trim(this.state.category),
      subCategory = _.trim(this.state.subCategory),
      name = _.trim(this.state.name),
      price = _.trim(this.state.price),
      size = _.trim(this.state.size),
      description = _.trim(this.state.description),
      uid = this.state.uid;

    if (_.isEmpty(uid) || uid === null) {
      console.log("NO UID");
      return;
    }

    var job = {
      category,
      subCategory,
      name,
      price,
      size,
      description,
      uid,
      state: "Evaluando propuestas",
      creationTime: new Date().getTime()
    };

    console.log(job);
    if (_.isEmpty(description)) {
      return;
    }

    var buttonSubmit = document.getElementById("submitPost");
    if (buttonSubmit) {
      buttonSubmit.classList.add("disabled");
    }

    var newPostKey = firebase.database().ref().child('jobs').push().key;

    var updates = {};
    updates[`/jobs/${newPostKey}`] = job;
    updates[`users/${uid}/postedJobs/${newPostKey}`] = job;

    try {
      await firebase.database().ref().update(updates);
      firebase.database().ref(`users/${uid}/postedJobsCount/`)
        .transaction(currentRank => {
          // If users/ada/rank has never been set, currentRank will be `null`.
          if (currentRank) {
            currentRank++;
          } else {
            currentRank = 1;
          }
          return currentRank;
        });

      swal({
        title: "¡Enhorabuena!",
        text: "Su propuesta ha sido publicada exitosamente. Pronto estarás recibiendo solicitudes de los mejores freelancers.",
        icon: "success",
        button: "Aceptar",
      })
        .then(() => {
          window.location.href = "/profile";
        });
      // return true;
    }

    catch (error) {
      console.log(error);
      swal({
        title: "¡Atención!",
        text: msgError(error.code, error.message),
        icon: "info",
        button: "Aceptar",
      });
      if (buttonSubmit) {
        buttonSubmit.classList.remove("disabled");
      }
      return false;
    }

  }

  render() {
    var current = this.state.currentComponent;
    // console.log(current);
    var currentComponent;
    var steps = this.state;

    if (current === "SelectCategory") {
      currentComponent = <SelectCategory steps={steps} goToStep={this.goToStep} setCategory={this.setCategory} />;
    } else if (current === "Name") {
      currentComponent = <Name steps={steps} goToStep={this.goToStep} setName={this.setName} />;
    } else if (current === "PriceAndSize") {
      currentComponent = <PriceAndSize steps={steps} goToStep={this.goToStep} setPriceAndSize={this.setPriceAndSize} />;
    } else if (current === "Description") {
      currentComponent = <Description steps={steps} submit={this.submit} goToStep={this.goToStep} setDescription={this.setDescription} />;
    } else if (current === "Publish") {
      currentComponent = <Publish steps={steps} submit={this.submit} goToStep={this.goToStep} />;
    } else if (current === "UploadFiles") {
      currentComponent = <UploadFiles />
    }

    return (
      <div className="PostJob padding-below">
        {/* <Header /> */}

        <header className="Header">
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="/home">NetJob</a>
          </nav>
        </header>

        <main role="main" className="container">
          <div className="container">
            {currentComponent}
            {/* <SelectCategory setCategory={this.setCategory} category={this.state.category} /> */}
            {/* <Name goToStep={this.goToStep} setName={this.setName} /> */}
            {/* <PriceAndSize goToStep={this.goToStep} setPriceAndSize={this.setPriceAndSize} /> */}
          </div>

        </main>
        {/* <hr className="featurette-divider" />
        <Footer /> */}
      </div>
    );
  }
}

export default PostJob;
