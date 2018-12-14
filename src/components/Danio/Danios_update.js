import axios from 'axios'
import React, { Component } from 'react';
import '../Lotes/lote_listado.css';
import 'query-string' 

class Danios_update extends Component {
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
        this.setState({
           [id]:value
       }
       )
   }
   componentDidMount(){
    this.setState({nombre:this.props.match.params.nombre})
   }
   onChangeStatus=(estatus)=>{
     this.setState.nombre_estatus=estatus
      }
   onSubmitForm=(e)=>{
       e.preventDefault() 
       axios.put(`https://inboundbelher.herokuapp.com/catalogos/Danios/update/${this.props.match.params.id}`,this.state)
       .then(Variedad => alert("Daño actualizado"))
       .catch(err => alert(err))
   }
    render(){
        
        return (
            
            <form className="p-4" onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Nombre del daño</label>
                      <div className="row">
                        <div className="col-10">
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre del daño"
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

export default Danios_update;