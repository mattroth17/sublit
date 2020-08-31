/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, Marker,
} from 'google-maps-react';
import Geocode from 'react-geocode';

const mapStyles = {
  width: '100%',
  height: '84%',
  position: 'relative',
  fullscreenControl: false,
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      stores: [],
    };
  }

  componentDidMount() {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey('AIzaSyC4YOXX43hNkUFFtxLlALsnWk49LAlvz70');
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    this.props.listings.map((listing) => {
      if (listing.address !== '') {
        Geocode.fromAddress(listing.address).then(
          (response) => {
            const latitude = response.results[0].geometry.location.lat;
            const longitude = response.results[0].geometry.location.lng;
            this.setState((previousState) => ({
              stores: [...previousState.stores, {
                lat: latitude, lng: longitude, id: listing.id, address: listing.address,
              }],
            }));
          }, (error) => {
            // not sure we can do any other error handling here (no mapStateToProps)
            console.error(error);
          },
        );
      } else {
        console.log('address was null');
      }
    });
  }

  onMarkerClick = (target) => {
    this.props.testCallback(target, this.props.listings);
  }

  getMarkers = () => {
    return this.state.stores.map((store, index) => {
      // eslint-disable-next-line react/no-array-index-key
      return (<Marker key={store.id} title={store.id} position={{ lat: store.lat, lng: store.lng }} onClick={this.onMarkerClick} />);
    });
  }

  renderMap = () => {
    if (this.state.stores.length > 0) {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{ lat: 43.702813, lng: -72.288530 }}
          style={mapStyles}
        >
          {this.getMarkers()}
        </Map>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }

  render() {
    return (
      <div className="map-div">
        {this.renderMap()}
      </div>
    );
  }
}

// eslint-disable-next-line new-cap
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCs8zgkvXjenh0x2eZSuaBma0_9iZAnbV0',
})(MapContainer);
