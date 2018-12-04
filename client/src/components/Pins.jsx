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
                        <button onClick={()=>{this.props.save(--i, this.state.newNote)}}>save</button>
                      </td>
                      <td>
                        <button onClick={()=>{this.props.delete(--i)}}>delete</button>
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
                      <button onClick={()=>{this.props.edit(--i)}}>edit</button>
                    </td>
                    <td>
                      <button onClick={()=>{this.props.delete(--i)}}>delete</button>
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
