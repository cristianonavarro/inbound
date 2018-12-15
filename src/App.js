import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Lote from './components/Lotes/Lotes'
import lote_update from './components/Lotes/lote_update'

import Cultivo from './components/Cultivos/Cultivos'
import Cultivo_update from './components/Cultivos/Cultivo_update'

import Caseta from './components/Casetas/Casetas'
import Caseta_update from './components/Casetas/Caseta_update'

import Variedad from './components/Variedades/Variedades'
import Variedad_update from './components/Variedades/Variedad_update'

import Danios from './components/Danio/Danioss'
import Danios_update from './components/Danio/Danios_update'

import Inbound from './components/Inbound/inbound'
import InboundDetalle from './components/Inbound/inbound_detalle'


class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <main>
          <div className="App">
            <Navbar />

            <div className="container">
              <Route exact path="/catalogo/lotes" component={Lote} />
              <Route exact path="/catalogo/lotes/update/:id/:nombre" component={lote_update} />

              <Route exact path="/catalogo/cultivos" component={Cultivo} />
              <Route exact path="/catalogo/cultivos/update/:id/:nombre" component={Cultivo_update} />

              <Route exact path="/catalogo/casetas" component={Caseta} />
              <Route exact path="/catalogo/casetas/update/:id/:nombre" component={Caseta_update} />

              <Route exact path="/catalogo/variedad" component={Variedad} />
              <Route exact path="/catalogo/variedad/update/:id/:nombre" component={Variedad_update} />

              <Route exact path="/catalogo/danios" component={Danios} />
              <Route exact path="/catalogo/danios/update/:id/:nombre" component={Danios_update} />

              <Route exact path="/inbound" component={Inbound} />
              <Route exact path="/inbound/:id" component={InboundDetalle} />

            </div>

          </div>
        </main>
      </BrowserRouter>

    );
  }
}

export default App;
