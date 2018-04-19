/* global fetch */
import React from 'react';
import urlJoin from 'url-join';
import isEmail from 'is-email';
import gravatar from 'gravatar-url';

import config from '../config';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';

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
    console.log(this.email.value);
  }

  login(e) {
    e.preventDefault();

    if (this.state.loading) return;

    this.setState({
      loading: true, content: null, response: null, query: null,
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
        content, response, loading: false, query: null,
      }));
  }

  render() {
    return (<div>
      <Header />
      <div className="container page" style={pageStyle}>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Perfil</h3>
                <p className="subtitle has-text-grey">Preencha sua credenciais para continuar.</p>
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
