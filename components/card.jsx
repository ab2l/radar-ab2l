import React, { Component } from 'react';
import strip from 'remove-markdown';
import truncate from 'trunc-text';

import { thumbs, background } from './image';

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
    };
  }

  render() {
    const { profile } = this.state;
    const { _id } = profile;
    const { onClick, small } = this.props;

    return (<div className="card">
      {!small && (
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={background(profile.userContext_background)}
            alt="background"
          />
        </figure>
      </div>)}
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={thumbs(profile.userContext_logo)} alt={profile.bipbopContentRFB.nome} />
            </figure>
          </div>
          <div className="media-content" style={{ overflow: 'inherit' }}>
            <p className="title is-4">{profile.bipbopContentRFB.nome}</p>
            <p className="subtitle is-6">{profile.bipbopContentRFB['natureza-juridica']}</p>
          </div>
        </div>
        <div className="content">{truncate(strip(profile.userContext_profile), 256)}</div>
      </div>
      <footer className="card-footer">
        <a href={`profile?id=${_id}`} onClick={e => onClick(e)} className="card-footer-item">Abrir</a>
      </footer>
    </div>);
  }
}
