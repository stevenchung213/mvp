import React from 'react';

export default class Pins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newNote: ''
    };

    this.editNote = this.editNote.bind(this);
  }

  editNote (e) {
    this.setState({
      newNote: e.target.value
    });
  }

  render() {
    // console.log(this.props)
    if (this.props.pins.length > 0) {
      return (
        <React.Fragment>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">label</th>
                <th scope="col">coordinates</th>
              </tr>
            </thead>
            <tbody>
            {this.props.pins.map((pin, i) => {
              if (pin.editNow === true) {
                return (
                  <tr key={i}>
                    <th scope="row">{++i}</th>
                      <td><input type="text" onChange={this.editNote} placeholder={pin.note}></input></td>
                      <td>{'x: ' + pin.position.lat
                      + ' y: ' + pin.position.lng}
                      </td>
                      <td>
                        <button style={{borderRadius:13}} onClick={()=>{this.props.save(pin.id, this.state.newNote)}}>save</button>
                      </td>
                      <td>
                        <button style={{borderRadius:13}} onClick={()=>{this.props.delete(pin.id)}}>delete</button>
                      </td>
                  </tr>
                )
              } else {
                return (
                  <tr key={i}>
                    <th scope="row">{++i}</th>
                    <td>{pin.note}</td>
                    <td>{'x: ' + pin.position.lat
                    + ' y: ' + pin.position.lng}
                    </td>
                    <td>
                      <button style={{borderRadius:13}} onClick={()=>{this.props.edit(pin.id)}}>edit</button>
                    </td>
                    <td>
                      <button style={{borderRadius:13}} onClick={()=>{this.props.delete(pin.id)}}>delete</button>
                    </td>
                  </tr>
              )}
            })}
            </tbody>
          </table>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <table className="table table-dark">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">label</th>
              <th scope="col">coordinates</th>
            </tr>
            </thead>
            <tbody>
              <tr key={''}>
                <th scope="row"></th>
                <td><b>no pins recorded</b></td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      )
    }
  }
};
