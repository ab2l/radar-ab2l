import React from 'react';

export default () => (<footer
  className="footer"
  style={{
  fontSize: '12px',
   color: '#333',
    padding: '3rem 1.5rem',
}}
>
  <div className="container">
    <div className="content has-text-centered">
      <p style={{ maxWidth: '326px', lineHeight: '160%', margin: 'auto' }}>
        <strong>Radar AB2L</strong> por <a href="https://jgthms.com">AB2L - Associação Brasileira de Lawtechs e Legaltechs</a>.&nbsp;
        O código fonte é licenciado sobre os termos da <a href="https://www.gnu.org/licenses/gpl-3.0.html">GPLv3</a>.&nbsp;
        O conteúdo deste site é licenciado sobre os termos da <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
      </p>
      <p style={{ fontSize: '16px', margin: '12px auto 0' }}>
        <a href="https://github.com/bipbop/radar-ab2l" title="Código Fonte"><i className="fab fa-github-alt" /></a>
      </p>
      <p style={{ fontSize: '16px', margin: '12px auto 0' }}>
        <a className="button" href="https://t.me/joinchat/EqNwYEHf1-e4SehRU_YNSQ" title="Código Fonte"><i className="fab fa-telegram" /> &nbsp; Comunidade</a>
      </p>
    </div>
  </div>
  <script src="https://unpkg.com/bipbop-websocket" />
  <script src="https://unpkg.com/bipbop-webservice" />
</footer>);
