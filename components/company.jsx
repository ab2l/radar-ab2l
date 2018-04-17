import React, { Component } from 'react';


export default class Company extends Component {
  render() {
    const { img1280by960, caption1280by960 } = this.props;
    const { img96by96, caption96by96 } = this.props;
    const { name, username, summary } = this.props;
    const { id } = this.props;

    return (<div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={img1280by960} alt={caption1280by960} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={img96by96} alt={caption96by96} />
            </figure>
          </div>
          <div className="media-content" style={{ overflow: 'inherit' }}>
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">@{username}</p>
          </div>
        </div>
        <div className="content">{summary}</div>
      </div>
      <footer className="card-footer">
        <a href={`/ficha?id=${id}`} className="card-footer-item">Ficha</a>
        <a href={`/socios?id=${id}`} className="card-footer-item">Sócios</a>
        <a href={`/site?id=${id}`} className="card-footer-item">Site</a>
      </footer>
    </div>);
  }
}
