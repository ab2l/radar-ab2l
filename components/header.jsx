import React from 'react';
import Head from 'next/head';

import Brand from './navbar/brand';
import Buttons from './navbar/buttons';

export default ({ hideNav }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bulma-pageloader@1.0.1/dist/bulma-pageloader.min.css" rel="stylesheet" />
      <link href="/static/favicon.png" rel="shortcut icon" type="image/png" />
      <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js" />
      <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" />
    </Head>
    {!hideNav && (
    <nav className="navbar has-shadow" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Brand />
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a href="/signup" title="Cadastrar-se" className="navbar-item">
              <span className="icon"><i className="fas fa-plus" /></span>
            </a>
            <a href="/login" title="Entrar" className="navbar-item">
              <span className="icon"><i className="fas fa-lock" /></span>
            </a>
            <Buttons />
          </div>
        </div>
      </div>
    </nav>)}
  </div>
);
