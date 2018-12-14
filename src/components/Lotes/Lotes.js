import axios from 'axios'
import React, { Component } from 'react';
import Lote_listado from './lote_listado'
class Lote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      estatus: "A",
      isposback: false,
      lista: []
    }

  }
  componentDidMount() {
    axios.get('https://inboundbelher.herokuapp.com/catalogos/lotes')
      .then(Lotes => {
        this.setState({ lista: Lotes.data })
      })
      .catch(err => alert(err))
  }

  renderLotes = () => {
    if (this.state.lista.length === 0) {
      return <h1>Cargando...</h1>
    } else {

      const Listado = this.state.lista.map(lote => {
        return <Lote_listado id={lote._id} nombre={lote.nombre} estatus={lote.estatus} />

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
    axios.post(`https://inboundbelher.herokuapp.com/catalogos/lotes/create/`, { nombre: this.state.nombre, estatus: this.state.estatus })
      .then(lote => window.location.reload())
      .catch(err => alert(err))

  }
  render() {
    return (
      <form className="p-4" onSubmit={this.onSubmitForm}>
        <button type="button" className="btn btn-info btn_nuevo" data-toggle="modal" data-target="#exampleModal3">Nuevo</button>
        <table className="table">
          {this.renderLotes()}
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
                <input type="text" className="form-control" id="nombre" placeholder="Nombre del lote" onChange={this.onInputChange} value={this.state.nombre} />
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

export default Lote;