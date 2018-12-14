import axios from 'axios'
import React, { Component } from 'react';
import Cultivo_listado from './Cultivo_listado'
class Cultivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:"",
      estatus:"",
      lista: []
    }

  }
  componentDidMount() {
    axios.get('https://inboundbelher.herokuapp.com/catalogos/cultivos')
      .then(Cultivos => {
        this.setState({ lista: Cultivos.data })
      })
      .catch(err => alert(err))

  }

  renderLotes = () => {
    if (this.state.lista.length === 0) {
      return <h1>Cargando...</h1>
    } else {

      const Listado = this.state.lista.map(Cultivos => {
        return <Cultivo_listado id={Cultivos._id} nombre={Cultivos.nombre} estatus={Cultivos.estatus} />

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
    axios.post(`https://inboundbelher.herokuapp.com/catalogos/cultivos/create/`, { nombre: this.state.nombre, estatus: this.state.estatus})
      .then(Cultivo => window.location.reload())
      .catch(err => alert(err))

  }
  render() {
    return (
      <form className="p-4"  onSubmit={this.onSubmitForm} >
        <button type="button" className="btn btn-info btn_nuevo" data-toggle="modal" data-target="#exampleModal3">Nuevo</button>
        <table className="table">
          {this.renderLotes()}
        </table>

        <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal3Label">Nuevo cultivo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" id="nombre" placeholder="Nombre del cultivo" onChange={this.onInputChange} value={this.state.nombre} />
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

export default Cultivo;