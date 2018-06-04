import React from 'react';

export default class ProfileTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.active };
  }

  render() {
    const { tabs, onChange } = this.props;

    return (<div className="tabs is-toggle">
      <ul>
        {Object.keys(tabs).map(e => (
          <li
            key={e}
            className={e === this.state.active ? 'is-active' : ''}
          >
            <a
              href={`#/${e}`}
              onClick={(event) => {
                  event.preventDefault();
                  this.setState({ active: e });
                  onChange(e);
              }}
            >
              {tabs[e]}
            </a>
          </li>
      ))}

      </ul>
    </div>);
  }
}
