import React, { Component } from 'react';
import './Carousel.css';
import swal from 'sweetalert';
import SignUpModal from '../signup_modal/SignUpModal';
window.$ = window.jQuery = require('jquery');

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
        this.handlePostNotSession = this.handlePostNotSession.bind(this);
    }

    handlePostNotSession = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/post' });
        window.$('#SignUpModal').modal('show');
        // data-toggle="modal" data-target="#SignUpModal"
        // $('#myModal').modal('toggle');
        // window.$('#SignUpModal').modal('hide');
    }

    // componentDidUpdate() {
    //     var sesion = this.props.sesion || false;
    //     this.setState({ sesion });
    // }

    render() {
        var sesion = localStorage.getItem("sesion") === "true" ? true : false;
        var buttonPost;
        var buttonWork;

        if (sesion === true) {
            buttonPost = <a className="btn btn-lg btn-secondary col-sm-12" href="/post" role="button">Publica un proyecto</a>;
            buttonWork = <a className="btn btn-lg btn-primary col-sm-12" href="/jobs" role="button">Trabaja como freelancer</a>;
        } else {
            buttonPost = <a className="btn btn-lg btn-secondary col-sm-12" href="/post" role="button" onClick={this.handlePostNotSession}>Publica un proyecto</a>;
            buttonWork = <a className="btn btn-lg btn-primary col-sm-12" href="/jobs" role="button">Trabaja como freelancer</a>;
        }

        return (
            // <div id="myCarousel" className="carousel slide carousel-fade" data-ride="carousel" data-interval="60000">
            <div id="myCarousel" className="carousel slide carousel-fade" data-ride="carousel" data-interval="8000">
                {/* carousel-fade > para animacion en el div principal */}
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to={0} className="active" />
                    <li data-target="#myCarousel" data-slide-to={1} />
                    {sesion === false ? <li data-target="#myCarousel" data-slide-to={2} /> : ""}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="first-slide img-fluid img-brghtness" src="./images/2.jpeg" alt="First slide" />
                        < div className="container">
                            <div className="carousel-caption text-left">
                                <h1 className="slide1">Miles de freelancers listos para comenzar a trabajar en tu proyecto.</h1>
                                <p>Contrata freelancers expertos para cualquier trabajo, cercanos y de todo el mundo para hacer realidad sus ideas.</p>
                                {/* <p><a className="btn btn-lg btn-primary" href="#" role="button">Iniciar sesión</a></p> */}
                                {/* <div className="btn-group" role="group">
                                    <p><a className="btn btn-lg btn-secondary mr-2" href="#" role="button">Publica un proyecto</a></p>
                                    <p><a className="btn btn-lg btn-primary mr-2" href="#" role="button">Trabaja como freelancer</a></p>
                                </div> */}
                                {/* <div className="btn-group" role="group">
                                    <p><a className="btn btn-lg btn-secondary mr-2" href="#" role="button">Quiero contratar</a></p>
                                    <p><a className="btn btn-lg btn-primary mr-2" href="#" role="button">Quiero trabajar</a></p>
                                </div> */}
                                <div className="row" role="group">
                                    <p>{buttonPost}</p>
                                    <p>{buttonWork}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {sesion === false ?
                        <div className="carousel-item">
                            <img className="second-slide img-fluid img-brghtness" src="./images/9.jpeg" alt="Second slide" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Hágalo con un profesional independiente.</h1>
                                    <p>Ingresa ahora para encontrar grandes proyectos en cuales trabajar o para hacer crecer su negocio a través del sitio web contratando talento cercano o de todo el mundo.</p>
                                    <div className="btn-group" role="group">
                                        <p><a className="btn btn-lg btn-secondary mr-2" href="/signup" role="button">Registrarse</a></p>
                                        <p><a className="btn btn-lg btn-primary mr-2" href="/signin" role="button">Iniciar sesión</a></p>
                                    </div>
                                </div>
                            </div>
                        </div> : ""}
                    <div className="carousel-item">
                        <img className="third-slide img-fluid img-brghtness" src="./images/7.jpeg" alt="Third slide" />
                        <div className="container">
                            <div className="carousel-caption text-right">
                                <h1 className="slide3">¿Qué tipo de trabajo puedo hacer?</h1>
                                <p>Trabajos pequeños, medianos y grandes. Trabajos pagados a precio fijo o por hora. Trabajos que requieran un conjunto de habilidades, costo o fechas específicas.</p>
                                <p><a className="btn btn-lg btn-primary" href="/how_it_works" role="button">Explorar</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
                <SignUpModal redirect={this.state.redirect} />
            </div>
        );
    }
}

export default Carousel;