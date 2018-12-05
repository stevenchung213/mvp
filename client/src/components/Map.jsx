import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import api from '../config/api.js';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked () {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  render () {

    const style = {
      width: '96vw',
      height: '85vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    };

    return (
      <Map
        google={this.props.google}
        xs = {12}
        zoom ={5}
        style={style}
        onClick={this.onMapClicked}
      >
        {this.props.pins.map((marker, i) => {
          return (
            <Marker
              key={i}
              onClick={this.onMarkerClick}
              // title={marker.title}
              name={marker.note}
              position={marker.position}
            />
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h6>{this.state.selectedPlace.name}</h6>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api
})(MapContainer);
