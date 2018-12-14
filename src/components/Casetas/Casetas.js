import axios from 'axios'
import React, { Component } from 'react';
import Caseta_listado from './Caseta_listado'
class Caseta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:"",
      estatus:"A",
      id_lote:"",
      lista: [],
      lista_lotes:[]
    }

  }
  componentDidMount() {
       axios.get('https://inboundbelher.herokuapp.com/catalogos/casetas')
      .then(Caseta => {this.setState({ lista: Caseta.data })})
      .catch(err => alert(err))

      axios.get('https://inboundbelher.herokuapp.com/catalogos/lotes')
      .then(Lotes => {this.setState({lista_lotes: Lotes.data })})
      .catch(err => alert(err))
  }

  renderCaseta = () => {
    if (this.state.lista.length === 0) {
      return <h1>Cargando...</h1>
    } else {

      const Listado = this.state.lista.map(Caseta => {
        return <Caseta_listado id={Caseta._id} nombre={Caseta.nombre} lote={Caseta.lote.nombre}  estatus={Caseta.estatus} />
        

      })
      return Listado
    }

  }
  renderEstatus = () => {
  
    if (this.state.lista_lotes.length === 0) {
        return <option></option>
    } else {
        const Listado = this.state.lista_lotes.map(lote => {
            return <option value={lote._id}>{lote.nombre}</option>

        })
       
        return Listado
    }

}
onClickLote=(e)=>{
  // this.setState.id_lote =e.target.value
  const { id, value } = e.target
    this.setState({
      [id]: value
    })
     console.log(this.state.id_lote)
}
  onInputChange = (e) => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault()
    axios.post(`https://inboundbelher.herokuapp.com/catalogos/casetas/create/`, { nombre: this.state.nombre, estatus: this.state.estatus,lote:this.state.id_lote})
      .then(Cultivo => window.location.reload())
      .catch(err => alert(err))

  }
  render() {
    return (
      <form className="p-4" onSubmit={this.onSubmitForm}>
        <button type="button" className="btn btn-info btn_nuevo" data-toggle="modal" data-target="#exampleModal3">Nuevo</button>
        <table className="table">
          {this.renderCaseta()}
        </table>

        <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal3Label">Nueva caseta</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" id="nombre" placeholder="Nombre de la caseta" onChange={this.onInputChange} value={this.state.nombre} />
                <select className="cmb_lote" id="id_lote"  onChange={this.onClickLote} value={this.state.id_lote}>
                        {this.renderEstatus()}
                </select>
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

export default Caseta;