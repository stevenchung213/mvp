import React from 'react';
import $ from 'jquery';
import GoogleApiWrapper from './Map.jsx';
import Pins from './Pins.jsx';


export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      coordinates: '',
      pins: [],
      key: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.note, '\n', this.state.coordinates);
  }

  handleSubmit (e) {
    e.preventDefault();
    let lat = this.state.coordinates.split(' ')[0];
    let lng = this.state.coordinates.split(' ')[1];
    let data = {
      note: this.state.note,
      position: {
        lat: Number(lat),
        lng: Number(lng)
      }
    };
    $.post('/pins', data, (err, res) => {
      if (err) {
        console.log('ERROR = ', err);
      }
      console.log('Entry posted = ', res);
    }, 'json');
    $('.inputs').val('');
    this.setState({
      key: this.state.key++
    });
    this.componentDidMount();
  }

  componentDidMount () {
    $.get('/pins', data => {
      this.setState({
        pins: data
      });
    }, 'json');
  }

  render () {

    return (
      <React.Fragment>
        <div className="input-container" style={{paddingLeft:10}}>
          <div className="note">
            <form onSubmit={this.handleSubmit}>
              <label style={{width:250}}>
                enter a label for the pin
                <br/>
                <input className="inputs" type="text" name="note" onChange={this.handleChange} style={{width:250}} />
              </label>
              <label style={{paddingLeft:10, width:250}}>
                enter coordinates
                <br/>
                <input className="inputs" type="text" name="coordinates" onChange={this.handleChange} style={{width:250}} />
              </label>
              <input type="submit" value="submit" />
              <a href="https://latitude.to/" target="_blank" style={{paddingLeft:10, fontSize:18}}>copy and paste coordinates from here</a>
            </form>
          </div>
        </div>
        <Pins pins={this.state.pins} />
        <GoogleApiWrapper pins={this.state.pins}/>
      </React.Fragment>
    )
  }
}
