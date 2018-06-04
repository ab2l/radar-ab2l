import { Component } from 'react';
import urlJoin from 'url-join';

import config from '../config';

const { address } = config;

/* global fetch, FormData, XMLHttpRequest */

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
    };
  }

  imageName() {
    return 'avatar';
  }

  sendPicture(content) {
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
        field: this.imageName(),
        value: content,
      }),
    })
      .then(response => response.json())
      .then(response => Object.assign(response, {
        token: this.state.profile.token,
      }))
      .then(profile => this.setState({ profile }))
      .then(profile => Object.assign(this.state.profile, profile));
  }

  handleFileUpload() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'text';

      xhr.open('POST', urlJoin(address.api, '/company/uploadImage'), true);

      const file = this.logoUpload.files[0];
      const formdata = new FormData();

      formdata.append('picture', file);
      xhr.send(formdata);

      xhr.onreadystatechange = function onComplete() {
        const { profile } = this.state;
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          reject(xhr.responseText);
          return;
        }
        resolve(JSON.parse(xhr.responseText));
        this.setState(profile);
      }.bind(this);
    }).then(content => this.sendPicture(content));
  }
}
