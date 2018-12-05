import React, { Component } from 'react';
import './PriceAndSize.css';
import swal from 'sweetalert';
import _ from 'lodash';

class PriceAndSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 'RD$2.500 - 5.000',
      size: 'Medio',
      steps: {} 
    };
    this.goBack = this.goBack.bind(this);
    this.handlePriceAndSize = this.handlePriceAndSize.bind(this);
  }

  componentWillMount() {
    // this.setState({ price:'RD$2.500 - 5.000' });
    // this.setState({ size:'Medio' });
    var price = this.props.steps.price;
    var size = this.props.steps.size;

    if (price !== null && !_.isEmpty(price)) {
      this.setState({ price });
    }

    if (size !== null && !_.isEmpty(size)) {
      this.setState({ size });
    }

    var steps = this.props.steps;
    if (steps) {
      this.setState({ steps });
    }
  }

  goBack = () => {
    this.props.goToStep("Name");
  }

  handlePriceAndSize = () => {
    let price = this.state.price;
    let size = this.state.size;
    // if (_.isEmpty(price) || price === null || _.isEmpty(size) || size === null) {
    //   return;
    // }
    this.props.setPriceAndSize({ price, size });
    this.props.goToStep("Description");
  }

  render() {
    var buttonNextClasses;
    if (_.isEmpty(this.state.price) || this.state.price === null || _.isEmpty(this.state.size) || this.state.size === null) {
      // buttonNextClasses = "disabled";
    }
    // var buttonNextClasses = this.state.name === null ? "disabled" : "";
    var steps = this.state.steps;

    return (
      <div className="row mt-3">
        <div className="col-12">
          <div className="container text-left">
            <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
            <h5>Tamaño y presupuesto</h5>
            {/* <h6 className="text-mute">El tamaño y el presupuesto sirven para que los freelancers entiendan el alcance del trabajo a realizar.</h6> */}
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <br />
          <div className="col-md-12" style={{ minHeight: "150px" }}>
            {/* <input type="text" style={{padding: "22px"}} className="col-12 form-control" placeholder="Por ejemplo: Diseño de un logo" onChange={e => this.setState({ name: e.target.value })} value={this.state.name || ""} /> */}
            <div className="row">
              <div className="col-12 col-md-6">
                <select onChange={e => this.setState({ size: e.target.value })} value={this.state.size} className="form-control form-control-lg">
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <select onChange={e => this.setState({ price: e.target.value })} value={this.state.price} className="form-control form-control-lg">
                  <option value="Menos de RD$2.500">Menos de RD$2.500</option>
                  <option value="RD$2.500 - 5.000">RD$2.500 - 5.000</option>
                  <option value="RD$5.000 - 12.000">RD$5.000 - 12.000</option>
                  <option value="RD$12.000 - 25.000">RD$12.000 - 25.000</option>
                  <option value="RD$25.000 - 50.000">RD$25.000 - 50.000</option>
                  <option value="RD$50.000 - 150.000">RD$50.000 - 150.000</option>
                  <option value="Mas de RD$150.000">Mas de RD$150.000</option>
                </select>
              </div>
            </div>
          </div>
          {/* Botones */}
          <br />
          <div className="col-12">
            <div className="btn-toolbar btn-group-lg" role="group">
              <button onClick={this.goBack} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-info mr-auto">ANTERIOR</button>
              <button onClick={this.handlePriceAndSize} type="button" style={{ paddingLeft: "30px", paddingRight: "30px" }} className={`btn btn-secondary ${buttonNextClasses}`}>SIGUIENTE</button>
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

export default PriceAndSize;
