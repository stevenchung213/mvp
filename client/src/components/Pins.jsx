import React from 'react';

const Pins = (props) => {
  if (props.pins.length > 0) {
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
            {props.pins.map((pin, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{++i}</th>
                  <td>{pin.note}</td>
                  <td>{'x: ' + pin.position.lat
                        + ' y: ' + pin.position.lng}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h5 style={{paddingLeft:10}}>no pins available</h5>
      </React.Fragment>
    )
  }
};

export default Pins;
