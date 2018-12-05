import React, { Component } from 'react';
import './Publish.css';
import firebase from 'firebase';

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {},
      file: null
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmitFile = this.handleSubmitFile.bind(this);
  }

  componentWillMount() {
    var steps = this.props.steps;
    if (steps) {
      this.setState({ steps });
    }
  }

  goBack = () => {
    this.props.goToStep("Description");
  }

  handleSave = () => {
    // this.props.submit(this.state.file);
    var file = this.state.file;
    var newPostKey = firebase.database().ref().child('jobs').push().key;
    if(file) {
      this.handleSubmitFile(newPostKey, file);
    } else {
      this.props.submit(newPostKey);
    }
    
  }

  handleSubmitFile = (newPostKey, file) => {
    var metadata = {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath
    };

    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(`documents/${newPostKey}/${file.name}`).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
        default:
          break;
      }
    }, error => {
      if (error) { console.log(error) };
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        this.props.submit(newPostKey, downloadURL);
        // return downloadURL;
      });
    });
    //   this.handleUploadImage(e);
  }

  render() {
    var buttonNextClasses = "";
    // if (_.isEmpty(this.state.description) || this.state.description === null) {
    //   buttonNextClasses = "disabled";
    // }
    // var buttonNextClasses = this.state.name === null ? "disabled" : "";
    var steps = this.state.steps;

    var file = this.state.file;

    return (
      <div className="Publish row mt-3">
        <div className="col-12">
          <div className="container text-left">
            <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
            <h5>Sube un archivo para dar mas detalles y publica tu propuesta.</h5>
            {/* <h6 className="text-mute">El tamaño y el presupuesto sirven para que los freelancers entiendan el alcance del trabajo a realizar.</h6> */}
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <br />
          <div className="col-md-12" style={{ minHeight: "150px" }}>
            {/* <input type="text" style={{padding: "22px"}} className="col-12 form-control" placeholder="Por ejemplo: Diseño de un logo" onChange={e => this.setState({ name: e.target.value })} value={this.state.name || ""} /> */}
            <div className="row">
              <div className="col-12">
                <input onChange={e => { this.setState({ file: e.target.files[0] }) }} className="file-input" type="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf" />
                {file !== null ? <p className="m-2">Nombre del archivo: <span>{file.name}</span></p> : ""}
              </div>
            </div>
          </div>
          {/* Botones */}
          <br />
          <div className="col-12">
            <div className="btn-toolbar btn-group-lg" role="group">
              <button onClick={this.goBack} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-info mr-auto">ANTERIOR</button>
              <button onClick={this.handleSave} type="button" id="submitPost" style={{ paddingLeft: "30px", paddingRight: "30px" }} className={`btn btn-secondary ${buttonNextClasses}`}>PUBLICAR</button>
            </div>
          </div>
          {/* Botones */}
        </div>
        <div className="col-5 d-none d-md-block">
          {/* <div className="cajaproyecto"> */}
          <div className="bg-white text-left" style={{ width: "100%", border: "solid 1px rgba(0, 0, 0, 0.2)", borderRadius: "2px" }}>
            {/* <img style={{ width: '100%' }} className="img" id="imgcategoria" /> */}
            <div className="p-4">
              <p><i className="fa fa-check" /> Categoría: {steps.category}</p>
              <p><i className="fa fa-check" /> Nombre: {steps.name}</p>
              <p><i className="fa fa-check" /> Presupuesto: {steps.price}</p>
              <p><i className="fa fa-check" /> Alcance: {steps.size}</p>
              <p><i className="fa fa-check" /> Descripción: {steps.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Publish;
