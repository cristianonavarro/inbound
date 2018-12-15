import axios from 'axios'
import React, { Component } from 'react';

var cargado=false;

class InboundDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idDanioSelecionado:"",
            nombreDanioSelecionado:"",
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
    }
    onClick = (e) => {
        if(cargado) { 

            const { id, value } = e.target
            this.setState({
                [id]: value
            })
            }
          
        
    }


    renderSelectDanio = () => {
        if (this.state.listaDanios.length === 0) {
            return <option></option>
        } else {
            const Listado = this.state.listaDanios.map(danio => {

                // return   <button className="list-group-item " id="idDanioSelecionado" value={danio._id}  data-toggle="modal" data-target="#exampleModal3" onClick={this.onClick()}  > {danio.nombre} </button>
                 return   <a className="list-group-item " href="#!" id="idDanioSelecionado" value={danio._id}  data-toggle="modal" data-target="#exampleModal3"  > {danio.nombre}      </a>

            })
          
            return Listado

        }
    }



    onSubmitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`https://inboundbelher.herokuapp.com/inbound/danios/create/`, { danio: this.state.danio, leve: this.state.leve, severo: this.state.severo, merma: this.state.merma })
            .then(lote => window.location.reload())
            .catch(err => alert(err))

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


                {/* <button type="button" className="btn btn-info btn_nuevo" data-toggle="modal" data-target="#exampleModal3">Nuevo</button> */}



                <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Nuevo lote</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div classname="modal-body">
                                <div class="form-group">
                                    <select classname="estatus" id="lote" onchange="{this.onInputChange}" value="{this.state.lote}">
                                        {this.renderSelectDanio()}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input classname="form-control" id="leve" max="50" min="0" onchange="{this.onInputChange}" type="number" value="{this.state.leve}" />
                                </div>
                                <div class="form-group">
                                    <input classname="form-control" id="severo" max="50" min="0" onchange="{this.onInputChange}" type="number" value="{this.state.severo}" />
                                </div>
                                <div class="form-group">
                                    <input classname="form-control" id="merma" max="50" min="0" onchange="{this.onInputChange}" type="number" value="{this.state.merma}" />
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

export default InboundDetalle;