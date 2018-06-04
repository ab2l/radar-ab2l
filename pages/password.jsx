/* global fetch, window */
import React from 'react';
import urlJoin from 'url-join';
import Head from 'next/head';
import queryString from 'query-string';

import config from '../config';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';
import PasswordSuccess from '../components/password-success';

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
  }

  changePassword(e) {
    e.preventDefault();

    if (this.state.loading) return;

    this.setState({
      loading: true, content: null, response: null,
    });

    fetch(urlJoin(api, '/company/changePassword'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailCode: queryString.parse(window.location.search).c,
        newPassword: this.password.value,
        confirmNewPassword: this.repeatPassword.value,
      }),
    }).then(content => Promise.all([content, content.json()]))
      .then(([content, response]) => this.setState({
        content, response, loading: false,
      }));
  }

  render() {
    if (this.state.content && this.state.content.status === 200) {
      return <PasswordSuccess />;
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
                <h3 className="title has-text-grey">Recuperar Acesso</h3>
                <p className="subtitle has-text-grey">Preencha sua nova senha para continuar.</p>
                { this.state.response && this.state.response.status !== 200 && <Notification
                  type="danger"
                  message={this.state.response.toString()}
                /> }
                <div className="box">

                  <form onSubmit={e => this.changePassword(e)}>

                    <div className="field">
                      <div className="control">
                        <input
                          ref={(e) => { this.password = e; }}
                          className="input is-large"
                          type="password"
                          placeholder="Nova senha da conta."
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          ref={(e) => { this.repeatPassword = e; }}
                          className="input is-large"
                          type="password"
                          placeholder="Repetir senha da conta."
                        />
                      </div>
                    </div>

                    <input
                      type="submit"
                      className="button is-block is-info is-large is-fullwidth"
                      value="Alterar"
                    />
                  </form>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>);
  }
}
