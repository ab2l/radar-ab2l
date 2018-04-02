import React from 'react';
import Head from 'next/head';
import Brand from './navbar/brand';
import Burger from './navbar/burger';
import Buttons from './navbar/buttons';

export default () => (
    <div>
      <Head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" rel="stylesheet"></link>
        <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
      </Head>
      <nav className="navbar has-shadow" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Brand />
            <Burger />
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="#">Associados</a>
              <a className="navbar-item" href="#">Distribuições</a>
              <a className="navbar-item" href="#">Processos</a>
              <a className="navbar-item" href="#">Advogados</a>
              <a className="navbar-item" href="#">Escritórios</a>
            </div>
            <div className="navbar-end">
              <a className="navbar-item is-hidden-desktop-only">
                <span className="icon"><i className="fas fa-lock"></i></span>
              </a>
              <Buttons />
            </div>          
          </div>          
        </div>
      </nav>
    </div>

)   