import React from 'react';

export default () => (
  <div className="navbar-item">
    <div className="field is-grouped">
      <p className="control">
        <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
          <span className="icon"><i className="fab fa-twitter" /></span>
          <span>Compartilhar</span>
        </a>
      </p>
      <p className="control">
        <a className="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
          <span className="icon"><i className="fas fa-download" /></span>
          <span>eBook</span>
        </a>
      </p>
    </div>
  </div>);
