import React from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';
import queryString from 'query-string';

import Header from '../components/header';
import pageStyle from '../style/page';

/* global fetch, window */

import config from '../config';


const { address } = config;
const { api } = address;

export default class EmailSuccess extends React.Component {
  componentDidMount() {
    fetch(urlJoin(api, '/company/validateEmail'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryString.parse(window.location.search)),
    }).then(content => Promise.all([content, content.json()]))
      .then(([content, response]) => this.setState({
        content, response, loading: false,
      }));
  }

  render() {
    return (<div>
      <Header />
      <Head>
        <meta name="robots" content="noindex" />
        <title>Parabéns! Agora o seu e-mail foi confirmado | AB2L</title>
      </Head>
      <div
        className="container page"
        style={Object.assign(pageStyle, {
        lineHeight: '160%',
      })}
      >
        <section
          className="hero is-success"
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
                ><i className="far fa-envelope-open" /> <br /> E-mail validado com sucesso!</h3>
                <p className="subtitle">Agora só falta o contato da nossa equipe para que você possa aparecer no radar.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>);
  }
}
