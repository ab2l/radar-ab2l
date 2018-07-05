import React from 'react';

export default class FilterCompanyType extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'todas' };
  }

  render() {
    return (<p className="panel-tabs">{['todas', 'sa', 'ltda', 'eireli', 'mei'].map(c => (<a
      key={c}
      onClick={(e) => {
            e.preventDefault();
            this.setState({ current: c });
            this.props.filters.define('type', this.state.current);
          }}
      href={`?c=${c}`}
      className={this.state.current === c ? 'is-active' : null}
    >{c}</a>))}</p>);
  }
}

