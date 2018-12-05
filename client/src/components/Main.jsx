import React from 'react';
import $ from 'jquery';
import GoogleApiWrapper from './Map.jsx';
import Pins from './Pins.jsx';


export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      force: false,
      note: '',
      coordinates: '',
      pins: [],
      pinCount: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editPin = this.editPin.bind(this);
    this.savePin = this.savePin.bind(this);
    this.deletePin = this.deletePin.bind(this);
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
      id: this.state.pinCount,
      editNow: false,
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
    this.state.pinCount++;
    this.componentDidMount();
  }

  editPin (pinID) {
    console.log(pinID);
    this.setState(prevState => {
      let updated = [...prevState.pins];
      updated[pinID].editNow = true;
      return { pins: updated };
    });
  }

  savePin (pinID, note) {
    this.setState(prevState => {
      let updated = [...prevState.pins];
      updated[pinID].note = note;
      updated[pinID].editNow = false;
      return { pins: updated };
    });

    $.ajax({
      type: 'PATCH',
      url: `/pins/${pinID}`,
      data: {id: pinID, note: note}
    });
  }

  deletePin (pinID) {
    this.setState(prevState => {
      let updated = [...prevState.pins];
      updated.splice(pinID, 1);
      return { pins: updated };
    });

    $.ajax({
      type: 'DELETE',
      url: `/pins/${pinID}`,
      data: {id: pinID}
    });
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
                <input className="inputs" id="name-input" type="text" name="note" style={{borderRadius:35}} onChange={this.handleChange} style={{width:250, borderRadius:13}} />
              </label>
              <label style={{paddingLeft:10, width:250}}>
                enter coordinates
                <br/>
                <input className="inputs" id="coordinates-input" type="text" name="coordinates" onChange={this.handleChange} style={{width:250, borderRadius:13}} />
              </label>
              <input type="submit" value="submit" style={{marginLeft:20, borderRadius:13}}/>
              <a href="https://latitude.to/" target="_blank" style={{paddingLeft:10, fontSize:18}}>copy and paste coordinates from here</a>
            </form>
          </div>
        </div>
        <Pins pins={this.state.pins} edit={this.editPin} save={this.savePin} delete={this.deletePin} submit={this.handleSubmit}/>
        <GoogleApiWrapper force={!this.state.force} pins={this.state.pins}/>
      </React.Fragment>
    )
  }
}
