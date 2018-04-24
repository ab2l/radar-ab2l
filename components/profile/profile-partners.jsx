import React from 'react';

export default class ProfilePartners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
    };
  }

  render() {
    const { profile } = this.state;
    return (<div>
      <div className="content">
        <ul>
          {profile.bipbopContentRFB.socios.socio.map(name => (
            <li key={name}>{name}</li>
        ))}
        </ul>
      </div>
    </div>);
  }
}

