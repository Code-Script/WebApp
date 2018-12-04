import React, { Component } from 'react';
import './HireModal.css';

class HireModal extends Component {
    render() {
        return (
            <div className="modal fade" id="HireModal" tabIndex={-1} role="dialog" aria-labelledby="HireModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="HireModalCenterTitle">Ofrece tus servicios a ***</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <select className="custom-select">
                                        <option value={0} disabled selected>Elige una categoria</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <select className="custom-select">
                                        <option value={0} disabled selected>Elige una sub-categoria</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-sm-12 input-group mt-3 mb-3">
                                    <input type="text" placeholder="Nombre del proyecto" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <div className="col-sm-12 form-group mb-3">
                                    <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                                </div>
                                <div className="col-sm-12 input-group mt-3 mb-3">
                                    <label htmlFor="customRange1">Rango de precio</label>
                                    <input type="range" className="custom-range" id="customRange1" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ENVIAR SOLICITUD</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HireModal;