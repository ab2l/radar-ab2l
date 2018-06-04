import React from 'react';
import urlJoin from 'url-join';
import config from '../../config';

const { address } = config;

/* global fetch */

export default class ProfileTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      profile: props.profile,
    };

    if (!props.options) return;
    let currentOption = props.options.indexOf(props.value);
    if (currentOption === -1) currentOption = 0;
    this.state.currentOption = currentOption;
  }

  next() {
    const { options } = this.props;
    let { currentOption } = this.state;

    currentOption += 1;

    if (currentOption >= options.length) {
      currentOption = 0;
    }

    this.setState({
      currentOption,
      value: options[currentOption],
    });


    const { _id, token } = this.state.profile;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => fetch(urlJoin(address.api, '/company/edit'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        _id,
        field: this.props.id,
        value: this.state.value,
      }),
    }), 1200);
  }

  render() {
    const { type } = this.props;
    const { value } = this.state;
    const { profile } = this.state;

    if (!this.props.options || !profile.token) {
      return (<div className="control">
        <div className="tags has-addons">
          <span className={`tag is-${type || 'info'}`}>{value}</span>
        </div>
      </div>);
    }

    return (<div className="control">
      <div className="tags has-addons">
        <a onClick={() => this.next()} href="#/changeTag">
          <span className={`tag is-${type || 'info'}`}>{value}</span>
        </a>
      </div>
    </div>);
  }
}
