/* global fetch */

import React from 'react';
import showdown from 'showdown';
import { Markdown } from 'react-showdown';
import urlJoin from 'url-join';
import ProfileLogoRadar from './profile-logo-radar';
import config from '../../config';

const { address } = config;

const converter = new showdown.Converter();

export default class ProfileCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      profile: props.profile,
    };
  }

  placeholder() {
    return 'Insira a descrição da sua empresa, em formato markdown (.md). Para referência em como escrever um markdown, acesse [este link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) e utilize qualquer editor de sua preferência, por exemplo o [Markdownpad](http://markdownpad.com/) ou o [ghostwriter](https://wereturtle.github.io/ghostwriter/). Lembre-se que uma boa descrição da sua empresa deve conter um breve resumo da organização, sua história, seu status atual e suas projeções futuras. É também importante enfatizar as características únicas de seu produto ou serviço e dizer quais são seus diferenciais em relação ao mercado.';
  }

  markdownRender() {
    const data = converter.makeHtml(this.markdownField.value);
    this.previewField.innerHTML = data;
  }

  fieldName() {
    return 'profile';
  }

  save() {
    const { _id, token } = this.state.profile;
    return fetch(urlJoin(address.api, '/company/edit'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        _id,
        field: this.fieldName(),
        value: this.markdownField.value,
      }),
    }).then(response => response.json())
      .then(object => Object.assign(object, {
        token,
      }))
      .then(profile => Object.assign(this.state.profile, profile))
      .then(profile => this.setState(Object.assign({ profile, edit: false })));
  }

  render() {
    const fieldValue = this.state.profile[`userContext_${this.fieldName()}`];

    if (this.state.edit) {
      return (<div>
        <textarea
          rows="10"
          className="textarea content"
          ref={(e) => { this.markdownField = e; }}
          onChange={() => this.markdownRender()}
          placeholder={this.placeholder()}
          defaultValue={fieldValue || this.state.userContext_profile}
        />
        <div className="content" ref={(e) => { this.previewField = e; }} />
        <button
          className="button"
          title="Editar"
          onClick={() => this.save()}
        ><i className="fas fa-save" /> &nbsp; Salvar</button>
      </div>);
    }

    return (<div>


      <div className="content">
        <h1><ProfileLogoRadar profile={this.state.profile} /></h1>
        <p><Markdown markup={fieldValue || this.placeholder()} /></p>
      </div>
      { this.state.profile.token && (<button
        className="button"
        title="Editar"
        onClick={() => {
          this.setState({ edit: true });
        }}
      ><i className="fas fa-pencil-alt" /> &nbsp; Editar</button>)}
    </div>);
  }
}
