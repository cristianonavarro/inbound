
import React,{Component} from 'react';

class Navbar extends Component{


    render(){
        return(
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Inbound</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                         <a className="nav-link" href="/catalogo/lotes">Lote</a>
                    </li>
                    <li className="nav-item">
                         <a className="nav-link" href="/catalogo/cultivos">Cultivos</a>
                    </li>
                    <li className="nav-item">
                         <a className="nav-link" href="/catalogo/casetas">Casetas</a>
                    </li>
                    <li className="nav-item">
                         <a className="nav-link" href="/catalogo/variedad">Variedades</a>
                    </li>
                    <li className="nav-item">
                         <a className="nav-link" href="/catalogo/danios">Daños</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Buscar" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                </form>
            </div>
            </nav>
             
      
        )
    }
}

export default Navbar;
