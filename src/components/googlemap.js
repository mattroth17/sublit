import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      stores: [{ lat: 43.702813, long: -72.288530 }],
    };
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          id="googlemap"
          initialCenter={{ lat: 43.702813, lng: -72.288530 }}
        >
          <Marker position={{ lat: 43.702813, lng: -72.288530 }} />
        </Map>

      </div>
    );
  }
}

// map state to props? redux shi?
// eslint-disable-next-line new-cap
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4YOXX43hNkUFFtxLlALsnWk49LAlvz70',
})(MapContainer);
