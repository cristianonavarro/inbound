import axios from 'axios'
import React, { Component } from 'react';


var cargado = false;


class InboundDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {

            idDanioSelecionado: "",
            nombreDanioSelecionado: "",

            lista: [],
            danio: "",
            leve: 0,
            severo: 0,
            merma: 0,


            listaDanios: [],
        }



    }
    componentDidMount() {
        axios.get('https://inboundbelher.herokuapp.com/inbound')
            .then(Inbound => { this.setState({ lista: Inbound.data }) })
            .catch(err => alert(err))


        axios.get('https://inboundbelher.herokuapp.com/catalogos/danios')
            .then(danios => { this.setState({ listaDanios: danios.data, danio: danios.data[0]._id }) })
            .catch(err => alert(err))

    }

    onInputChange = (e) => {
        const { id, value } = e.target
        this.setState({
            [id]: value
        })
        console.log(e.target)
    }
    onClick = (e) => {

        const { id, value } = e.target
        this.setState({
            [id]: value
        })
        console.log(this.state)

    }
    onClick2 = (e) => {
        const valores = e.target

        this.setState({ idDanioSelecionado: e.target.value });
        console.log(this.state.idDanioSelecionado)
        console.log(e.target)
    }
    }




    renderSelectDanio = () => {
        if (this.state.listaDanios.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaDanios.map(danio => {


                return <button className="list-group-item " id="idDanioSelecionado" value={danio._id} data-toggle="modal" data-target="#exampleModal3" onClick={this.onClick2}  > {danio.nombre} </button>
                // return   <a className="list-group-item " href="#!" id="idDanioSelecionado" value={danio._id}  data-toggle="modal" data-target="#exampleModal3" onClick={this.onClick2}  > {danio.nombre}  </a>

            })



            return Listado

        }
    }



    onSubmitForm = (e) => {
        e.preventDefault()
        console.log(this.state)

        if (e.target.id === "Guardar") {
            axios.post(`https://inboundbelher.herokuapp.com/inbound/danios/create/`, { danio: this.state.danio, leve: this.state.leve, severo: this.state.severo, merma: this.state.merma })
                .then(lote => window.location.reload())
                .catch(err => alert(err))
        }



    }


    render() {

        return (

            <form className="p-4" onSubmit={this.onSubmitForm}>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div className="list-group">
                            {this.renderSelectDanio()}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <table className="table">
                            <tr>
                                <td>
                                    Daño
                            </td>
                                <td>
                                    Leve
                            </td>
                                <td>
                                    Severo
                            </td>
                                <td>
                                    Merma
                            </td>
                            </tr>
                            <tr>
                                <td>
                                    Daño por frio
                            </td>
                                <td>
                                    7
                            </td>
                                <td>
                                    2
                            </td>
                                <td>
                                    5
                            </td>
                            </tr>
                        </table>
                    </div>
                </div>



                <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModal3Label">Captura de daños</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label>Cantidad de productos con daño leve</label>
                                <input type="number" min="0" max="50" className="form-control" id="leve" placeholder="Leve" onChange={this.onInputChange} value={this.state.leve} />
                                <label>Cantidad de productos con daño severo</label>
                                <input type="number" min="0" max="50" className="form-control" id="severo" placeholder="Severo" onChange={this.onInputChange} value={this.state.severo} />
                                <label>Cantidad de merma</label>
                                <input type="number" min="0" max="50" className="form-control" id="merma" placeholder="Merma" onChange={this.onInputChange} value={this.state.merma} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary">Guardar</button>
              
                            </div>
                        </div>
                    </div>
                </div>


            </form>




        );
    }
}

export default InboundDetalle;