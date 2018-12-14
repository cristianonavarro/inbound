import axios from 'axios'
import React, { Component } from 'react';
import '../Lotes/lote_listado.css';
import 'query-string'

class Caseta_update extends Component {
    constructor(props) {
        super(props);
        this.state = {

            nombre: "",
            lote: "",
            estatus: "A",
            nombre_estatus: "Activo",
            lista: []
        }
    }
    onInputChange = (e) => {
        const { id, value } = e.target
        this.setState({
            [id]: value
        })
        console.log(e.target.value)
    }
    componentDidMount() {
        axios.get('https://inboundbelher.herokuapp.com/catalogos/lotes')
            .then(Lotes => {
                this.setState({ lista: Lotes.data })
            })
            .catch(err => alert(err))

    }

    onSubmitForm = (e) => {
        e.preventDefault()
        axios.put(`https://inboundbelher.herokuapp.com/catalogos/casetas/update/${this.props.match.params.id}`, {nombre:this.state.nombre,estatus:this.state.estatus,lote:this.state.lote})
            .then(lote => alert("Caseta actualizado"))
            .catch(err => alert(err))
    }
    renderEstatus = () => {
        if (this.state.lista.length === 0) {
            return <option></option>
        } else {

            const Listado = this.state.lista.map(lote => {
                return <option value={lote._id}>{lote.nombre}</option>

            })
            return Listado
        }

    }
    render() {
        return (

            <form className="p-4" onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Nombre de la caseta</label>
                    <div className="row">
                        <div className="col-10">
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre de la caseta"
                                onChange={this.onInputChange}
                                value={this.state.nombre}
                            />
                        </div>
                        <div className="col-2">
                            <select className="estatus" id="estatus" onChange={this.onInputChange} value={this.state.estatus}>
                                <option value='A' selected>Activo</option>
                                <option value='C'>Cancelado</option>
                            </select>
                        </div>
                    </div>
                    <select className="cmb_lote" id="lote" onChange={this.onInputChange} value={this.state.lote}>
                        {this.renderEstatus()}
                    </select>
                </div>

                <button className="btn btn-success" type="submit">Guardar</button>
            </form>

        )

    }
}

export default Caseta_update;