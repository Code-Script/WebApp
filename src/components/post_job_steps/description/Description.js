import React, { Component } from 'react';
import './Description.css';
import swal from 'sweetalert';
import _ from 'lodash';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      steps: {}
    };
    this.goBack = this.goBack.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  componentWillMount() {
    var description = this.props.steps.description;

    if (description !== null || !_.isEmpty(description)) {
      this.setState({ description });
    }

    var steps = this.props.steps;
    if (steps) {
      this.setState({ steps });
    }
  }

  goBack = () => {
    this.props.goToStep("PriceAndSize");
  }

  handleDescription = () => {
    // let description = this.state.description;
    let description = document.querySelector("#post-description");
    description = description.value;
    if (_.isEmpty(description) || description === null) {
      return;
    }
    this.props.setDescription(description);
    this.props.goToStep("Publish");
  }

  render() {
    var buttonNextClasses;
    if (_.isEmpty(this.state.description) || this.state.description === null) {
      buttonNextClasses = "disabled";
    }
    // var buttonNextClasses = this.state.name === null ? "disabled" : "";
    var steps = this.state.steps;
 
    return (
      <div className="row mt-3">
        <div className="col-12">
          <div className="container text-left">
            <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
            <h5>Describe tu propuesta</h5>
            {/* <h6 className="text-mute">El tamaño y el presupuesto sirven para que los freelancers entiendan el alcance del trabajo a realizar.</h6> */}
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <br />
          <div className="col-md-12" style={{ minHeight: "150px" }}>
            {/* <input type="text" style={{padding: "22px"}} className="col-12 form-control" placeholder="Por ejemplo: Diseño de un logo" onChange={e => this.setState({ name: e.target.value })} value={this.state.name || ""} /> */}
            <div className="row">
              <div className="col-12">
                <textarea id="post-description" onChange={e => this.setState({ description: e.target.value })} value={this.state.description || ""} className="form-control" rows="7" style={{ minHeight: "185px" }} placeholder="Agrega todos los detalles de tu propuesta para que los freelancers puedan entender mejor las especificaciones de lo que quieres realizar." ></textarea>
              </div>
            </div>
          </div>
          {/* Botones */}
          <br />
          <div className="col-12">
            <div className="btn-toolbar btn-group-lg" role="group">
              <button onClick={this.goBack} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-info mr-auto">ANTERIOR</button>
              <button onClick={this.handleDescription} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className={`btn btn-secondary ${buttonNextClasses}`}>SIGUIENTE</button>
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

export default Description;
