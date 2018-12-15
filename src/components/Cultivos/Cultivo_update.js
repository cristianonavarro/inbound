import axios from 'axios'
import React, { Component } from 'react';
import '../Lotes/lote_listado.css';
import 'query-string' 
class Cultivo_update extends Component {
    constructor(props){
        super(props);
        this.state={
            
            nombre:"",
            estatus:"A",
            nombre_estatus:"Activo"
        }
    }
    componentDidMount(){
        this.setState({nombre:this.props.match.params.nombre})
       }
    onInputChange=(e)=>{
        const {id,value}=e.target
        this.setState({
           [id]:value
       })
   }

   onSubmitForm=(e)=>{
       e.preventDefault()  
       axios.put(`https://inboundbelher.herokuapp.com/catalogos/cultivos/update/${this.props.match.params.id}`,this.state)
       .then(lote => alert("Cultivo actualizado"))
       .catch(err => alert(err))
   }
    render(){
        return (
            
            <form className="p-4" onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Nombre del cultivo</label>
                      <div className="row">
                        <div className="col-10">
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre del cultivo"
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

export default Cultivo_update;