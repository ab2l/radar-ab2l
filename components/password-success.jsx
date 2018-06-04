import React from 'react';
import Head from 'next/head';

import Header from '../components/header';
import pageStyle from '../style/page';

export default () => (<div>
  <Header />
  <Head>
    <meta name="robots" content="noindex" />
    <title>Parabéns! Senha alterada com sucesso | AB2L</title>
  </Head>
  <div
    className="container page"
    style={Object.assign(pageStyle, {
        lineHeight: '160%',
      })}
  >
    <section
      className="hero is-primary"
      style={{
          borderRadius: '4px',
        }}
    >
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3
              className="title animated swing"
              style={{
                  marginBottom: '2rem',
                }}
            ><i className="fas fa-unlock-alt" /> <br /> Senha alterada com sucesso!</h3>
            <p className="subtitle">Você já pode se autenticar com sua nova senha de acesso.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>);
