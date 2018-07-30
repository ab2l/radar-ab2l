import _ from 'lodash';
import React from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';
import fetch from 'isomorphic-fetch';

import Card from '../components/card';
import Header from '../components/header';
import Filter from '../components/filter';

import config from '../config';
import pageStyle from '../style/page';

const { address } = config;
const { api } = address;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };
  }

  static async getInitialProps() {
    const response = await fetch(urlJoin(api, '/company/'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const content = await response.json();
    return { content };
  }

  filter() {
    const { filter } = this.state;
    const { content } = this.props;

    const { search } = filter;

    const keys = _.keys(_.pickBy(_.pickBy(filter, x => !!x), (value, key) => key.indexOf(['search']) === -1));

    return content
      .filter(({ userContext_business }) => !keys.length || keys.indexOf(userContext_business) !== -1)
      .filter(({
        bipbopContentRFB, userContext_profile, userContext_history, userContext_products, userContext_contact,
      }) =>
        !search || [bipbopContentRFB.nome, userContext_profile, userContext_history, userContext_products, userContext_contact].some(val =>
          new RegExp(search, 'i').test(val)));
  }

  render() {
    const content = this.props;
    return (<div>
      <Header hideNav />
      <Head>
        <title>Radar das Lawtechs</title>
      </Head>
      <div className="container page" style={pageStyle}>
        <div className="columns">
          <Filter onChange={(filter) => { this.setState({ filter }); }} />
          <div className="column">
            {content && _.chunk(this.filter(), 2).map(chunk =>
              (<div className="columns">
                {chunk.map(profile => (
                  <div key={profile._id} className="column is-half">
                    <Card onClick={() => this.openProfile(profile)} profile={profile} />
                  </div>))}
              </div>))}
          </div>
        </div>
      </div>
    </div>);
  }
}
