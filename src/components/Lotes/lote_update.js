import axios from 'axios'
import React, { Component } from 'react';
import './lote_listado.css';
import 'query-string' 
import { request } from 'https';
class lote_update extends Component {
    constructor(props){
        super(props);
        this.state={
            
            nombre:"",
            estatus:"A",
            nombre_estatus:"Activo"
        }
    }
    onInputChange=(e)=>{
        const {id,value}=e.target
        // console.log(e.target.value)
        this.setState({
           [id]:value
       })
   }
   onChangeStatus=(estatus)=>{
     this.setState.nombre_estatus=estatus
    // console.log(this.state.nombre_estatus,estatus)
   }
   onSubmitForm=(e)=>{
       e.preventDefault() 
    //    console.log(this.state)   
       axios.put(`https://inboundbelher.herokuapp.com/catalogos/lotes/update/${this.props.match.params.id}`,this.state)
       .then(lote => alert("Lote actualizado"))
       .catch(err => alert(err))
   }
    render(){
        return (
            
            <form className="p-4" onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Nombre del lote</label>
                      <div className="row">
                        <div className="col-10">
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre del lote"
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
                    </div>
               
                <button className="btn btn-success" type="submit">Guardar</button>
          </form>
                         
        )
   
    }
}

export default lote_update;