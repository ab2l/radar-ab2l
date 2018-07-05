import React from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';
import fetch from 'isomorphic-fetch';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import Header from '../components/header';
import Footer from '../components/footer';
import Profile from '../components/profile';

import config from '../config';

const { address } = config;
const { api } = address;


export default class PageProfile extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetch(urlJoin(api, `/company/${query.id.toString()}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const profile = await response.json();

    return {
      profile,
    };
  }

  render() {
    const { profile } = this.props;
    const marker = profile.geoloc[0].location;
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
        <title>{profile.bipbopContentRFB.nome} | AB2L</title>
      </Head>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBCz-h1-UxsWaLpQEIGuSqI9MDjC_d1Jgs"
        loadingElement={<div />}
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '120px' }} />}
      />
      <Profile profile={profile} />
      <Footer />
    </div>);
  }
}
