import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    goBack = () => {
        // this.props.goToStep("Description");
    }

    handleSave = () => {
        // this.props.submit();
    }

    handleSubmitFile = (e) => {
        const file = e.target.files[0];

        var uid = this.state.user.uid;

        if (!uid || _.isEmpty(uid) || uid == undefined || uid == 'undefined' || uid == null) {
            return;
        }

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`images/user_profile/${uid}/${file.name}`).put(file);

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
                console.log(downloadURL);
                document.getElementById("photoProfile").src = downloadURL;

                var user = firebase.auth().currentUser;
                user.updateProfile({
                    photoURL: downloadURL
                }).then(() => {
                    firebase.database().ref(`/users/${uid}/`).update({
                        photoURL: downloadURL
                    })
                        .then(() => {
                            console.log('Foto de perfil actualizada con éxito');
                        });

                }).catch(error => {
                    console.log(error);
                    console.log('Ocurrió un error al actualizar su foto de perfil');
                });

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

        return (
            <div className="UploadFiles row mt-3">
                <div className="col-12">
                    <div className="container text-left">
                        <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
                        <h5>Subir archivos</h5>
                        {/* <h6 className="text-mute">El tamaño y el presupuesto sirven para que los freelancers entiendan el alcance del trabajo a realizar.</h6> */}
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    <br />
                    <div className="col-md-12" style={{ minHeight: "150px" }}>
                        {/* <input type="text" style={{padding: "22px"}} className="col-12 form-control" placeholder="Por ejemplo: Diseño de un logo" onChange={e => this.setState({ name: e.target.value })} value={this.state.name || ""} /> */}
                        <div className="row">
                            <div className="col-12">


                                <input className="file-input" type="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf" />
                                
                                
                            </div>
                        </div>
                    </div>
                    {/* Botones */}
                    <br />
                    <div className="col-12">
                        <div className="btn-toolbar btn-group-lg" role="group">
                            <button onClick={this.goBack} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-info mr-auto">ANTERIOR</button>
                            <button onClick={this.handleSave} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className={`btn btn-secondary mr-auto ${buttonNextClasses}`}>GUARDAR</button>
                        </div>
                    </div>
                    {/* Botones */}
                </div>
                <div className="col-5 d-none d-md-block">
                    {/* <div className="cajaproyecto"> */}
                    <div className="bg-white text-left" style={{ width: "100%", border: "solid 1px rgba(0, 0, 0, 0.2)", borderRadius: "2px" }}>
                        {/* <img style={{ width: '100%' }} className="img" id="imgcategoria" /> */}
                        <div className="p-4">
                            <p className="text-success"><i className="fa fa-check" /> Definir categoria</p>
                            <p id="defnombreproyecto"><i className="fa fa-check" /> Definir nombre del proyecto</p>
                            <p id="defcaracteristicas"><i className="fa fa-check" /> Caracteristicas del proyecto</p>
                            <p><i className="fa fa-check" /> Definir archivos</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFiles;
