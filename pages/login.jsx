import React from 'react';
import gravatar from 'gravatar-url';
import isEmail from 'is-email';

import Header from '../components/header';
import Footer from '../components/footer';
import pageStyle from '../style/page';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
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
                  <form>
                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="email" placeholder="Endereço de e-mail." onChange={event => this.setState({ query: event.target.value })} />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" placeholder="Senha de acesso." />
                      </div>
                    </div>
                    <div className="field">
                      <label className="checkbox" htmlFor="remember"> <input type="checkbox" name="remember" id="remember" /> Continuar autenticado. </label>
                    </div>
                    <button className="button is-block is-info is-large is-fullwidth">Entrar</button>
                  </form>
                </div>
                <p className="has-text-grey">
                  <a href="/">Esqueci a Senha</a>&nbsp;·&nbsp;
                  <a href="/">Precisa de Ajuda?</a>
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
