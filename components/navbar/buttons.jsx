import React from 'react';

import config from '../../config';

const { address } = config;

const message = `Descubra, conheça e faça parte do ecossistema das lawtechs da AB2L em ${address.site}`

export default () => (
  <div className="navbar-item">
    <div className="field is-grouped">
      <p className="control">
        <a
          className="bd-tw-button button"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`}
        >
          <span className="icon"><i className="fab fa-twitter" /></span>
          <span>Compartilhar</span>
        </a>
      </p>
      <p className="control">
        <a className="button is-primary" href="/">
          <span className="icon"><i className="fas fa-download" /></span>
          <span>Livro</span>
        </a>
      </p>
    </div>
  </div>);
