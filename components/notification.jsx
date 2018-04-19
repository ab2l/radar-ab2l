import React from 'react';

export default class Notification extends React.Component {
  render() {
    return (<div ref={(e) => { this.container = e; }} className={`notification is-${this.props.type}`}>
      <button className="delete" onClick={() => { this.container.style.display = 'none'; }} />
      {this.props.message}
    </div>);
  }
}
