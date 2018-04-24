import React from 'react';

import { thumbs } from '../image';
import ImageUpload from '../image-upload';

export default class ProfileLogo extends ImageUpload {
  imageName() {
    return 'logo';
  }

  render() {
    const { profile } = this.state;

    if (!profile.token) {
      return (<figure className="image is-96x96">
        <img src={thumbs(profile.userContext_logo)} alt={profile.bipbopContentRFB.nome} />
      </figure>);
    }

    return (<div>
      <input
        ref={(e) => { this.logoUpload = e; }}
        style={{ display: 'none' }}
        type="file"
        onChange={() => this.handleFileUpload()}
      />
      <a
        href="#/upload"
        onClick={(e) => {
          e.preventDefault();
          this.logoUpload.click();
        }}
      >
        <figure className="image is-96x96">
          <img src={thumbs(profile.userContext_logo)} alt={profile.bipbopContentRFB.nome} />
        </figure>
      </a>
    </div>);
  }
}

