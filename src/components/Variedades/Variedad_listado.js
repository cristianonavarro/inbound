import React, { Component } from 'react';
import '../Lotes/lote_listado.css';
 
class Variedad_listado extends Component {
    constructor(props){
        super(props);
        
    }
  
  

    render(){
        var fn_estatus = function(estatus) {
            if(estatus==="A"){
                return "Activo"
            }else{
                return "Cancelado"
            }};
      
        return (
            <tr className="normal">
                <td>
                    {this.props.nombre}
                </td>
                <td>
                    {fn_estatus(this.props.estatus)}
                </td>
                <td>
                    <a class="nav-link badge badge-pill badge-primary" href={'/catalogo/Variedad/update/'+this.props.id} >Editar</a>
                </td>
            </tr>
                
           
             
        )
   
    }
}

export default Variedad_listado;