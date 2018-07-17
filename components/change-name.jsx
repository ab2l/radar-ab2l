import React, { Component } from 'react';

export default class ChangeName extends Component {
  render() {
    return (<div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="text" ref={(e) => {this.inputName = e; }} defaultValue={this.props.defaultValue} placeholder="Nome da empresa" />
            <span className="icon is-small is-left">
              <i className="far fa-building" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success" onClick={(e) => { this.props.onClick(e, this.inputName.value); }}>Alterar</button>
          </p>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" />
    </div>);
  }
}
