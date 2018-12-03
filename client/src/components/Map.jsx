import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import api from '../config/api.js';
import $ from 'jquery';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: this.props.pins
      // markers: [
      //   {
      //     title: "home marker",
      //     name: "home",
      //     position: {
      //       lat: 34.0522,
      //       lng: -118.2437
      //     }
      //   },
      //   {
      //     title: "marker 1",
      //     name: "my pin 1",
      //     position: {
      //       lat: 37.778519,
      //       lng: -122.40564
      //     }
      //   }
      // ]
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onClick (t, map, coordinates) {
    const { latLng } = coordinates;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
  }

  // onClick (t, map, coord) {
  //   const {latLng} = coord;
  //   const lat = latLng.lat();
  //   const lng = latLng.lng();
  //
  //   this.setState({
  //     markers: this.state.markers.push({
  //       title: '',
  //       name: '',
  //       position: {
  //         lat,
  //         lng
  //       }
  //     })
  //   });
  // }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindows: true
    });
  };

  onMapClick (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  // componentDidMount () {
  //   $.get('/pins', data => {
  //     console.log(data);
  //
  //     this.setState({
  //       markers: data
  //     });
  //     // console.log('DB data = ', data);
  //   });
  // }

  render () {

    const style = {
      width: '100%',
      height: '100%',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    };

    return (
      <Map
        google={this.props.google}
        xs = {12}
        zoom ={5}
        style={style}
        // onClick={this.onClick}
        // initialCenter={{
        //   lat: 34.0522,
        //   lng: -118.2437
        // }}
      >
        {this.state.markers.map((marker, i) => {
          return (
            <Marker
              key={i}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              // onMarkerClick={this.onMarkerClick}
            />
          )
        })}
        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        // onClose={this.onClose}
        >
        <Paper>
        <Typography
        variant={'headline'}
        component={'h4'}
        >
        {this.state.selectedPlace.name}
        </Typography>
        <Typography
        component={'p'}
        >
        Some Address <br/>
        Some Number
        </Typography>
        </Paper>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api
})(MapContainer);
