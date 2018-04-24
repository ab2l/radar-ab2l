/* global fetch */

import React from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';
import _ from 'lodash';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import Header from '../components/header';
import Footer from '../components/footer';
import Filter from '../components/filter';
import Card from '../components/card';

import pageStyle from '../style/page';
import config from '../config';
import Profile from '../components/profile';


const { address } = config;
const { api } = address;
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    fetch(urlJoin(api, '/company/'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(content => this.setState({
        loading: false,
        content,
      }));
  }

  openProfile(profile) {
    this.setState({
      profile,
    });
  }

  render() {
    if (this.state.profile) {
      const { profile } = this.state;
      const marker = profile.geoloc.pop().location;
      const MapWithAMarker = withScriptjs(withGoogleMap(() => (<GoogleMap
        defaultZoom={8}
        defaultCenter={marker}
      >
        <Marker position={marker} />
      </GoogleMap>)));

      return (<div>
        <Header />
        <Head>
          <meta name="robots" content="noindex" />
          <title>Edição de Perfil | AB2L</title>
        </Head>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div />}
          containerElement={<div style={{ height: '100%', width: '100%' }} />}
          mapElement={<div style={{ height: '120px' }} />}
        />
        <Profile profile={profile} />
        <Footer />
      </div>);
    }

    return (<div>
      <Header />
      <Head>
        <title>Radar das Lawtechs</title>
      </Head>
      <div className="container page" style={pageStyle}>
        <div className="columns">
          <Filter />
          <div className="column">
            {this.state.content && _.chunk(this.state.content, 2).map(content =>
              (<div className="columns">
                {content.map(profile => (
                  <div className="column is-half">
                    <Card onClick={() => this.openProfile(profile)} profile={profile} />
                  </div>))}
              </div>))}
          </div>
        </div>
      </div>
      {this.state.loading &&
    (<div id="loader" className="pageloader is-active"><span className="title">Carregando</span></div>)}
      <Footer />
    </div>);
  }
}
