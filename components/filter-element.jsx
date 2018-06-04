import React from 'react';

export default class FilterElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  active(active) {
    this.setState({
      active,
    });
  }

  render() {
    const { name, id } = this.props;
    return (<a
      onClick={(e) => {
        e.preventDefault();
        this.setState({
          active: !this.state.active,
        });
      }}
      href={`#${id}`}
      className={`panel-block${this.state.active ? ' is-active' : ''}`}
    >
      <span className="panel-icon" id={id}>
        <i className="fas fa-book" aria-hidden="true" />
      </span>
      {name}
    </a>);
  }
}

