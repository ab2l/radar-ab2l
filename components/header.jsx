import React from 'react';
import Head from 'next/head';

import Brand from './navbar/brand';
import Burger from './navbar/burger';
import Buttons from './navbar/buttons';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js" />
      <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" />
    </Head>
    <nav className="navbar has-shadow" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Brand />
          <Burger />
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" title="Lawtechs" href="/?t=associados">Lawtech</a>
            <a className="navbar-item" title="Early Stage" href="/?t=distribuicoes">Early Stage</a>
            <a className="navbar-item" title="Escritórios" href="/?t=processos">Escritórios</a>
            <a className="navbar-item" title="Departamentos" href="/?t=advogados">Departamentos</a>
            <a className="navbar-item" title="Prestador de Serviço" href="/?t=escritorios">Prestador de Serviço</a>
          </div>
          <div className="navbar-end">
            <a href="/signup" title="Cadastrar-se" className="navbar-item is-hidden-desktop-only">
              <span className="icon"><i className="fas fa-plus" /></span>
            </a>
            <a href="/login" title="Entrar" className="navbar-item is-hidden-desktop-only">
              <span className="icon"><i className="fas fa-lock" /></span>
            </a>
            <a href="/map" title="Mapa das Lawtechs" className="navbar-item is-hidden-desktop-only">
              <span className="icon"><i className="fas fa-map" /></span>
            </a>
            <Buttons />
          </div>
        </div>
      </div>
    </nav>
  </div>
);
