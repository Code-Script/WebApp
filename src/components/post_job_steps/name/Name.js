import React, { Component } from 'react';
import './Name.css';
import swal from 'sweetalert';
import _ from 'lodash';

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      steps: {}
    };
    this.goBack = this.goBack.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  componentWillMount() {
    var steps = this.props.steps;
    if (steps) {
      this.setState({ steps });
      var name = steps.name;

      if (name !== null || !_.isEmpty(name)) {
        this.setState({ name });
      }

    }
  }

  goBack = () => {
    this.props.goToStep("SelectCategory");
  }

  handleName = () => {
    let name = this.state.name;
    if (_.isEmpty(name) || name === null) {
      return;
    }
    this.props.setName(name);
    this.props.goToStep("PriceAndSize");
  }

  render() {
    var buttonNextClasses;
    if (_.isEmpty(this.state.name) || this.state.name === null) {
      buttonNextClasses = "disabled";
    }

    var category = this.state.steps.category || "Diseño de logo";
    // var buttonNextClasses = this.state.name === null ? "disabled" : "";

    var steps = this.state.steps;

    return (
      <div className="row mt-3">
        <div className="col-12">
          <div className="container text-left">
            <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
            <h5>Elige un nombre para tu propuesta</h5>
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <br />
          <div className="col-md-12" style={{ minHeight: "150px" }}>
            <input type="text" style={{ padding: "22px 20px" }} className="col-12 form-control" placeholder={`Por ejemplo: ${category}.`} onChange={e => this.setState({ name: e.target.value })} value={this.state.name || ""} />
          </div>
          {/* Botones */}
          <br /> 
          <div className="col-12">
            <div className="btn-toolbar btn-group-lg" role="group">
              <button onClick={this.goBack} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-info mr-auto">ANTERIOR</button>
              <button onClick={this.handleName} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className={`btn btn-secondary ${buttonNextClasses}`}>SIGUIENTE</button>
            </div>
          </div>
          {/* Botones */}
        </div>
        <div className="col-5 d-none d-md-block">
          {/* <div className="cajaproyecto"> */}
          <div className="bg-white text-left" style={{ width: "100%", border: "solid 1px rgba(0, 0, 0, 0.2)", borderRadius: "2px" }}>
            {/* <img style={{ width: '100%' }} className="img" id="imgcategoria" /> */}
            <div className="p-4">
              {/* <p className="text-success"><i className="fa fa-check" /> Categoría {steps.category}</p> */}
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

export default Name;
