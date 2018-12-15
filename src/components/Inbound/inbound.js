import axios from 'axios'
import React, { Component } from 'react';
import Inbound_listado from './Inbound_listado'
class Inbound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            folio: "",
            fecha: "",
            lote: "",
            caseta: "",
            cultivo: "",
            variedad: "",
            totalMuestra: 0,
            listaLote: [],
            listaCaseta: [],
            listaCultivo: [],
            listaVariedad: []
        }

    }
    componentDidMount() {
        axios.get('https://inboundbelher.herokuapp.com/inbound')
            .then(Inbound => { this.setState({ lista: Inbound.data }) })
            .catch(err => alert(err))


        axios.get('https://inboundbelher.herokuapp.com/catalogos/lotes')
            .then(lotes => { this.setState({ listaLote: lotes.data,lote: lotes.data[0]._id  }) })
            .catch(err => alert(err))

        axios.get('https://inboundbelher.herokuapp.com/catalogos/casetas')
            .then(casetas => { this.setState({ listaCaseta: casetas.data,caseta:casetas.data[0]._id }) })
            .catch(err => alert(err))

        axios.get('https://inboundbelher.herokuapp.com/catalogos/cultivos')
            .then(cultivos => { this.setState({ listaCultivo: cultivos.data,cultivo:cultivos.data[0]._id }) })
            .catch(err => alert(err))

        axios.get('https://inboundbelher.herokuapp.com/catalogos/variedades')
            .then(variedades => { this.setState({ listaVariedad: variedades.data,variedad:variedades.data[0]._id }) })
            .catch(err => alert(err))

    }

    renderInbound = () => {
        if (this.state.lista.length === 0) {
            return <h1>Cargando...</h1>
        } else {

            const Listado = this.state.lista.map(inbound => {
                return <Inbound_listado id={inbound._id} folio={inbound.folio} fecha={inbound.fecha} lote={inbound.lote} caseta={inbound.caseta} cultivo={inbound.cultivo} variedad={inbound.variedad} totalMuestra={inbound.totalMuestra} />

            })
            return Listado
        }
    }

    renderSelectLote = () => {
        if (this.state.listaLote.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaLote.map(lote => {
                return <option value={lote._id}  >{lote.nombre}</option>

            })
            return Listado
        }
    }

    renderSelectCaseta = () => {
        if (this.state.listaCaseta.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaCaseta.map(caseta => {
                return <option value={caseta._id}  >{caseta.nombre}</option>

            })
            return Listado
        }
    }

    renderSelectCultivo = () => {
        if (this.state.listaCultivo.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaCultivo.map(cultivo => {
                return <option value={cultivo._id}  >{cultivo.nombre}</option>

            })
            return Listado
        }
    }


    renderSelectVariedad = () => {
        if (this.state.listaCultivo.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaVariedad.map(Variedad => {
                return <option value={Variedad._id}  >{Variedad.nombre}</option>

            })
            return Listado
        }
    }




    onInputChange = (e) => {
        const { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`https://inboundbelher.herokuapp.com/inbound/create/`, { folio: this.state.folio, fecha: this.state.fecha, lote: this.state.lote, caseta: this.state.caseta, cultivo: this.state.cultivo, variedad: this.state.variedad, totalMuestra: this.state.totalMuestra })
            .then(lote => window.location.reload())
            .catch(err => alert(err))

    }


    render() {
        return (
            <form className="p-4" onSubmit={this.onSubmitForm}>
                <button type="button" className="btn btn-info btn_nuevo" data-toggle="modal" data-target="#exampleModal3">Nuevo</button>
                <table className="table">
                    {this.renderInbound()}
                </table>



                <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Nuevo lote</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="form-group">
                                    <input type="text" className="form-control" id="folio" placeholder="Folio" onChange={this.onInputChange} value={this.state.folio} />
                                </div>
                                <div class="form-group">
                                    <input type="date" className="form-control" id="fecha" placeholder="Fecha" onChange={this.onInputChange} value={this.state.fecha} />
                                </div>
                                <div class="form-group">
                                    <select className="estatus" id="lote" onChange={this.onInputChange} value={this.state.lote}>
                                        {this.renderSelectLote()}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select className="estatus" id="caseta" onChange={this.onInputChange} value={this.state.caseta}>
                                        {this.renderSelectCaseta()}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select className="estatus" id="cultivo" onChange={this.onInputChange} value={this.state.cultivo}>
                                        {this.renderSelectCultivo()}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select className="estatus" id="variedad" onChange={this.onInputChange} value={this.state.variedad}>
                                        {this.renderSelectVariedad()}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="number" className="form-control" id="totalMuestra" min="1" max="50" onChange={this.onInputChange} value={this.state.totalMuestra} />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </form>
        );
    }
}

export default Inbound;