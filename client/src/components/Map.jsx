import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import api from '../config/api.js';

const style = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render () {
    return (
      <Map
        google={this.props.google}
        zoom ={13}
        style={style}
        initialCenter={{
          lat: 34.0522,
          lng: -118.2437
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api
})(MapContainer);
