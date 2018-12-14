import React, { Component } from 'react';
import '../Lotes/lote_listado.css';
 
class Cultivo_listado extends Component {
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
                    <a className="nav-link badge badge-pill badge-primary" href={'/catalogo/cultivos/update/'+this.props.id+'/'+this.props.nombre} >Editar</a>
                </td>
            </tr>
                
           
             
        )
   
    }
}

export default Cultivo_listado;