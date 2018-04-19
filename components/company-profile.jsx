import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';


export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { img1280by960, caption1280by960 } = this.props;

    const MapWithAMarker = withScriptjs(withGoogleMap(() => (<GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>)));

    return (<div>
      <div className="hero">
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div />}
          containerElement={<div style={{ height: '100%', width: '100%' }} />}
          mapElement={<div style={{ height: '260px' }} />}
        />
        <div className="columns">
          <div className="column">
            <div className="hero-body">
              <div className="tabs is-toggle is-centered">
                <ul>
                  <li className="is-active"><a>Empresa</a></li>
                  <li><a>Sócios</a></li>
                  <li><a>História</a></li>
                  <li><a>Produtos</a></li>
                </ul>
              </div>
              <h2 className="title">Hero title</h2>
              <h3 className="subtitle">Hero subtitle</h3>
              <div className="content">
                <p>
                Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas.
                Vestibulum tortor quam, feugiat vitae, ultricies
                eget, tempor sit amet, ante. Donec eu libero sit
                amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
                </p>
              </div>
              <button
                className="button"
                title="Editar"
              ><i className="fas fa-pencil-alt" /> &nbsp; Editar</button>

            </div>

          </div>
          <div className="column">
            <figure className="image is-4by3">
              <img src={img1280by960} alt={caption1280by960} />
            </figure>
          </div>
        </div>
      </div>
    </div>);
  }
}
