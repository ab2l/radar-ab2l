import React from 'react';

import { background } from '../image';
import ImageUpload from '../image-upload';

export default class ProfileImage extends ImageUpload {
  imageName() {
    return 'background';
  }

  render() {
    const { profile } = this.state;
    if (!profile.token) {
      return (<figure className="image is-4by3">
        <img
          src={background(profile.userContext_background)}
          alt="background"
        />
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
        <figure className="image is-4by3">
          <img
            src={background(profile.userContext_background)}
            alt="background"
          />
        </figure>
      </a>
    </div>);
  }
}

