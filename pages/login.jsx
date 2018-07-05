/* global fetch */
import React from 'react';
import urlJoin from 'url-join';
import isEmail from 'is-email';
import gravatar from 'gravatar-url';
import Head from 'next/head';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import config from '../config';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';
import Profile from '../components/profile';

import pageStyle from '../style/page';

const { address } = config;
const { api } = address;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null, loading: false, content: null, response: null,
    };
  }

  forgot(e) {
    e.preventDefault();

    if (this.state.loading) return;

    this.setState({
      loading: true, content: null, response: null,
    });

    fetch(urlJoin(api, '/company/recoverPassword'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email.value,
      }),
    }).then(() => this.setState({ forgot: true }));
  }

  login(e) {
    e.preventDefault();

    if (this.state.loading) return;

    this.setState({
      loading: true, content: null, response: null,
    });

    fetch(urlJoin(api, '/company/login'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email.value,
        password: this.password.value,
      }),
    }).then(content => Promise.all([content, content.json()]))
      .then(([content, response]) => this.setState({
        content, response, loading: false,
      }));
  }

  render() {
    if (this.state.content && this.state.content.status === 200) {
      const profile = this.state.response;
      const marker = profile.geoloc.pop().location;
      const MapWithAMarker = withScriptjs(withGoogleMap(() => (<GoogleMap
        defaultZoom={8}
        defaultCenter={marker}
      >
        <Marker position={marker} />
      </GoogleMap>)));

      return (<div>
        <Header />
        <Head>
          <meta name="robots" content="noindex" />
          <title>Edição de Perfil | AB2L</title>
        </Head>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBCz-h1-UxsWaLpQEIGuSqI9MDjC_d1Jgs"
          loadingElement={<div />}
          containerElement={<div style={{ height: '100%', width: '100%' }} />}
          mapElement={<div style={{ height: '120px' }} />}
        />
        <Profile profile={profile} />
        <Footer />
      </div>);
    }

    return (<div>
      <Header />

      <Head>
        <meta name="robots" content="noindex" />
        <title>Entrar | AB2L</title>
      </Head>

      <div className="container page" style={pageStyle}>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Perfil</h3>
                <p className="subtitle has-text-grey">Preencha sua credenciais para continuar.</p>
                { this.state.forgot && <Notification
                  type="success"
                  message="Você receberá em instantes uma mensagem em sua caixa de entrada com informações para recuperar sua senha."
                /> }

                { this.state.response && this.state.response.status !== 200 && <Notification
                  type="danger"
                  message={this.state.response.toString()}
                /> }
                <div className="box">
                  <figure className="avatar">
                    <img
                      alt="avatar"
                      src={`${this.state.query && isEmail(this.state.query) ? gravatar(this.state.query, {
                        size: 128,
                        default: 'identicon',
                      }) : 'https://placehold.it/128x128'}`}
                      style={{
                      borderRadius: '64px',
                  }}
                    />
                  </figure>
                  <form onSubmit={e => this.login(e)}>
                    <div className="field">
                      <div className="control">
                        <input
                          ref={(e) => { this.email = e; }}
                          className="input is-large"
                          type="email"
                          placeholder="Endereço de e-mail."
                          onChange={event => this.setState({ query: event.target.value })}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          ref={(e) => { this.password = e; }}
                          className="input is-large"
                          type="password"
                          placeholder="Senha de acesso."
                        />
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="button is-block is-info is-large is-fullwidth"
                      value="Entrar"
                    />
                  </form>
                </div>
                <p className="has-text-grey">
                  <a href="/" onClick={e => this.forgot(e)}>Esqueci a Senha</a>&nbsp;·&nbsp;
                  <a href="https://br.gravatar.com/" title="Gravatar">Gravatar</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>);
  }
}
