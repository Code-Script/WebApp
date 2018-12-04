import React, { Component } from 'react';
import './SelectCategory.css';
import swal from 'sweetalert';
import _ from 'lodash';

class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      // elemento: '',
      // ultimo: '',
      idanterior: 'vacio',
      condicion: false
    };
    // this.handleCategory = this.handleCategory.bind(this);
    this.seleccionarCategoria = this.seleccionarCategoria.bind(this);
  }

  componentWillMount() {
    var category = this.props.steps.category;
    category = _.trim(category);
    if(category !== this.state.category) {
      this.setState({ category });
      // console.log(`MOUNT ${category}`);
    }

    if(!_.isEmpty(category) && category !== null) {
      // console.log(`29`);
      let checkDiv = document.querySelector(`#${category}`);
      console.log(checkDiv);
      if (checkDiv !== undefined && checkDiv !== null) {
        // console.log(`33`);
        let checkedDiv = document.querySelector(".checked");
        if (checkedDiv !== undefined && checkedDiv !== null) {
          // console.log(`36`);
          checkedDiv.classList.remove("checked");
        }
  
        checkDiv.classList.add("checked");
      }
    }
  }

  UNSAFE_componentWillReceiveProps() {
    var category = this.props.steps.category;
    category = _.trim(category);
    if(category !== this.state.category) {
      this.setState({ category });
      // console.log(`MOUNT ${category}`);
    }

    if(!_.isEmpty(category) && category !== null) {
      // console.log(`29`);
      let checkDiv = document.querySelector(`#${category}`);
      console.log(checkDiv);
      if (checkDiv !== undefined && checkDiv !== null) {
        // console.log(`33`);
        let checkedDiv = document.querySelector(".checked");
        if (checkedDiv !== undefined && checkedDiv !== null) {
          // console.log(`36`);
          checkedDiv.classList.remove("checked");
        }
  
        checkDiv.classList.add("checked");
      }
    }
  }

  seleccionarCategoria = (e) => {
    e.preventDefault();
    let category = e.target.id;
    // console.log(e.target);

    let checkDiv = document.getElementById(category);
    if (checkDiv !== undefined && checkDiv !== null) {
      let checkedDiv = document.querySelector(".checked");
      if (checkedDiv !== undefined && checkedDiv !== null) {
        checkedDiv.classList.remove("checked");
      }

      checkDiv.classList.add("checked");
      this.setState({ category });
    }
  }

  handleStart = () => {
    let category = this.state.category;

    if (category === null || _.isEmpty(category)) {
      // swal({
      //   title: "¡Atención!",
      //   text: "Debe seleccionar una categoría para continuar.",
      //   icon: "info",
      //   button: "Aceptar",
      // });
      return;
    }

    this.props.setCategory(category);
    this.props.goToStep("Name");

  }

  seleccionarCategoria2 = (e) => {
    var id = e.target.id;
    if (id === null) {
      return;
    }
    var elemento;
    // var ultimo = this.state.ultimo;
    var idanterior = this.state.idanterior;
    var condicion = this.state.condicion;

    if (idanterior != 'vacio') {
      document.getElementById(idanterior).style.boxShadow = 'none';
    }
    if (id == idanterior) {
      elemento = document.getElementById(id);
      elemento.style.boxShadow = '';
      idanterior = id;
      condicion = false;
    } else {
      elemento = document.getElementById(id);
      elemento.style.boxShadow = '2px 2px 8px 10px #36aff0';
      idanterior = id;
      condicion = true;
      // document.getElementById('snackbartext').innerHTML = 'Categoria: ' + id;
      // MostrarAlerta()
    }
    this.setState({ condicion });
    this.setState({ idanterior });

  }

  render() {
    var categories_json = [
      {
        title: 'Programación para móviles',
        href: 'mobile-developer',
        class: 'fas fa-tablet-alt'
      },
      {
        title: 'Programación web',
        href: 'web-developer',
        class: 'fas fa-code'
      },
      {
        title: 'Diseño de logo',
        href: 'logo',
        class: 'fab fa-fantasy-flight-games'
      },
      {
        title: 'Diseño web',
        href: 'web-designer',
        class: 'fas fa-money-check'
      },
      {
        title: 'Redacción de artículos',
        href: 'writer',
        class: 'fas fa-font'
        // far fa-edit
      },
      {
        title: 'E-commerce',
        href: 'e-commerce',
        class: 'fas fa-shopping-cart'
      },
      {
        title: 'Publicidad en Google, Facebook',
        href: 'advertising',
        class: 'fas fa-chart-line'
      },
      {
        title: 'Ilustraciones',
        href: 'picture',
        class: 'fas fa-paint-brush'
      },
      {
        title: 'WordPress',
        href: 'wordpress',
        class: 'fab fa-wordpress'
      },
      {
        title: 'Contenido para sitios web',
        href: 'content-for-websites',
        class: 'fas fa-globe'
        // class: 'fas fa-drafting-compass'
      },
      {
        title: 'Crear o editar video',
        href: 'video',
        // class: 'fas fa-film'
        class: 'fas fa-magic'
      },
      {
        title: 'Servicios generales',
        href: 'general-services',
        class: 'fas fa-user-tie'
      }
    ];

    var buttonCategoryClasses;
    if (_.isEmpty(this.state.category) || this.state.category === null) {
      buttonCategoryClasses = "disabled";
    }

    if (!_.isEmpty(categories_json) && categories_json.length > 0) {
      var categories = categories_json.map((category) =>
        <div key={category.title} className="col-6 col-md-4 col-lg-3 col-xl-2" style={{ zIndex: "1" }}>
          {/* <a id={`/${category.href}`} href={`/${category.href}`} onClick={this.handleRedirectToCategory}> */}
          {/* <a href={`/${category.href}`}> */}
          <div className="category-item" id={category.title} onClick={this.seleccionarCategoria} style={{ zIndex: "50" }}>
            <i id={category.title} className={`${category.class} col-12 category-i`} style={{ zIndex: "1" }}></i>
            <p id={category.title} className="col-12 category-p" style={{ zIndex: "1" }}>{category.title}</p>
          </div>
          {/* </a> */}
        </div>
      );
    }

    return (
      <div className="SelectCategory row mt-3">
        <div className="col-12">
          <div className="container text-left">
            <h1 className="display-6">Publica una propuesta de trabajo!</h1><br />
            <h5>Busquemos al mejor freelancer ¿Qué necesitas? <i className="fa fa-heart text-danger" /></h5>
          </div>
        </div>
        <div className="col-md-12">
          <br />
          <div className="Category">
            <div className="container" >
              <div className="row d-flex justify-content-center" style={{ textAlign: 'center' }}>
                {categories}
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <button type="button" onClick={this.handleStart} className={`btn btn-outline-primary col-md-2 ${buttonCategoryClasses}`} >COMENZAR</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-4 bg-white" style={{ border: "solid 1px black" }}>

        </div> */}
      </div>
    );
  }
}

export default SelectCategory;
