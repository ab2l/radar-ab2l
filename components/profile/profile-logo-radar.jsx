import React from 'react';

import { logo } from '../image';
import ImageUpload from '../image-upload';

export default class ProfileLogo extends ImageUpload {
  imageName() {
    return 'radar';
  }

  render() {
    const { profile } = this.state;
    if (!profile.token) {
      return <img src={logo(profile.userContext_radar)} alt={profile.bipbopContentRFB.nome} />;
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
        <img src={logo(profile.userContext_radar)} alt={profile.bipbopContentRFB.nome} />
      </a>
    </div>);
  }
}

