import React, { Component } from 'react';
import '../Lotes/lote_listado.css';

class Inbound_listado extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <tr className="normal">
                <td>
                    {this.props.folio}
                </td>
                <td>
                    {this.props.fecha}

                </td>
                <td>
                    {this.props.lote.nombre} {this.props.caseta.nombre} {this.props.cultivo.nombre} {this.props.variedad.nombre}
                </td>

                <td>
                    {this.props.totalMuestra}
                </td>
                <td>
                    <a class="nav-link badge badge-pill badge-primary" href={'/catalogo/lotes/update/' + this.props.id} >Editar</a>
                    <a class="nav-link badge badge-pill badge-warning" href={'/inbound/detalle/' + this.props.id} >detalle</a>
                </td>
            </tr>



        )

    }
}

export default Inbound_listado;