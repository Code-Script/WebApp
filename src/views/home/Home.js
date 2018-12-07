import React, { Component } from 'react';
import './Home.css';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Carousel from '../../components/carousel/Carousel';
import Category from '../../components/category/Category';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    // componentDidUpdate() {
    //     var sesion = this.props.sesion || false;
    //     this.setState({ sesion });
    // }

    render() {
        var sesion = localStorage.getItem("sesion") === "true" ? true : false;
        return (
            <div className="Home padding-below lighter-body-text">
                <Header />
                <main role="main">
                    <Carousel />
                    {/* Marketing messaging and featurettes */}
                    {/* Wrap the rest of the page in another container to center all the content. */}
                    <div className="container marketing">
                        {/* Three columns of text below the carousel */}
                        {/* <div className="row">
                            <div className="col-lg-4">
                                <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width={140} height={140} />
                                <h2>Heading</h2>
                                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                            <div className="col-lg-4">
                                <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width={140} height={140} />
                                <h2>Heading</h2>
                                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                            <div className="col-lg-4">
                                <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width={140} height={140} />
                                <h2>Heading</h2>
                                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                        </div> */}

                        {/* <hr className="featurette-divider" /> */}
                        <h2 className="text-center">Encuentra los mejores profesionales por sus áreas</h2>
                        <br />
                        {/* <br /> */}
                        <Category />

                        {/* START THE FEATURETTES */}
                        {/* <hr className="featurette-divider" />
                        <div className="row featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It'll blow your mind.</span></h2>
                                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                            </div>
                            <div className="col-md-5">
                                <img className="featurette-image img-fluid mx-auto" src="./images/placeholder.svg" alt="Generic placeholder image" />
                            </div>
                        </div>
                        <hr className="featurette-divider" />
                        <div className="row featurette">
                            <div className="col-md-7 order-md-2">
                                <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
                                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                            </div>
                            <div className="col-md-5 order-md-1">
                                <img className="featurette-image img-fluid mx-auto" src="./images/placeholder.svg" alt="Generic placeholder image" />
                            </div>
                        </div>
                        <hr className="featurette-divider" />
                        <div className="row featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                            </div>
                            <div className="col-md-5">
                                <img className="featurette-image img-fluid mx-auto" src="./images/placeholder.svg" alt="Generic placeholder image" />
                            </div>
                        </div>*/}
                        <hr className="featurette-divider" />
                    </div> 

                    <Footer />
                </main>
            </div>
        );
    }
}

export default Home;