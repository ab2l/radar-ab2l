import _ from 'lodash';
import React from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';
import fetch from 'isomorphic-fetch';

import Card from '../components/card';
import Header from '../components/header';
import Footer from '../components/footer';
import Filter from '../components/filter';

import config from '../config';
import pageStyle from '../style/page';

const { address } = config;
const { api } = address;

export default class Index extends React.Component {
  static async getInitialProps() {
    const response = await fetch(urlJoin(api, '/company/'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const content = await response.json();
    return {
      loading: false,
      content,
    };
  }

  render() {
    return (<div>
      <Header />
      <Head>
        <title>Radar das Lawtechs</title>
      </Head>
      <div className="container page" style={pageStyle}>
        <div className="columns">
          <Filter />
          <div className="column">
            {this.props.content && _.chunk(this.props.content, 2).map(content =>
              (<div className="columns">
                {content.map(profile => (
                  <div className="column is-half">
                    <Card onClick={() => this.openProfile(profile)} profile={profile} />
                  </div>))}
              </div>))}
          </div>
        </div>
      </div>
      {this.props.loading &&
    (<div id="loader" className="pageloader is-active"><span className="title">Carregando</span></div>)}
      <Footer />
    </div>);
  }
}
