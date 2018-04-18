import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import pageStyle from '../style/page';

export default class SignUp extends React.Component {
  render() {
    return (<div>
      <Header />
      <div className="container page" style={pageStyle}>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Cadastro</h3>
                <p className="subtitle has-text-grey">Preencha sua informações para cadastrar-se.</p>
                <div className="box">
                  <form>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="text" ref={(f) => { this.cnpj = f; }} placeholder="CPF do Resp. Legal" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="text" ref={(f) => { this.nascimento = f; }} placeholder="Data de Nascimento" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" name="email" placeholder="Endereço de Email" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="text" ref={(f) => { this.cnpj = f; }} placeholder="CNPJ da Empresa" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" placeholder="Senha de Acesso" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" placeholder="Confirmar Senha" />
                      </div>
                    </div>

                    <div className="field">
                      <label className="checkbox" htmlFor="agree"> <input type="checkbox" name="agree" id="agree" /> Estou ciente dos termos de serviço.</label>
                    </div>
                    <input type="submit" className="button is-block is-info is-large is-fullwidth" value="Entrar" />
                  </form>
                </div>
                <p className="has-text-grey">
                  <a href="/">Precisa de Ajuda?</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    );
  }
}
