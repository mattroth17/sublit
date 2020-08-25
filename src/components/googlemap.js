/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, Marker,
} from 'google-maps-react';
import Geocode from 'react-geocode';

const mapStyles = {
  width: '100%',
  height: '100%',
};

// do i need initMap function?
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      stores: [{ lat: 43.702813, long: -72.288530 }],
    };
  }

  componentDidMount() {
    console.log('googlemaps component did mount');
    console.log(this.props.listings);

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey('AIzaSyC4YOXX43hNkUFFtxLlALsnWk49LAlvz70');
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    this.props.listings.map((listing) => {
      if (listing.address !== '') {
        console.log(`listing address is ${listing.address}`);

        Geocode.fromAddress(listing.address).then(
          (response) => {
            const latitude = response.results[0].geometry.location.lat;
            const longitude = response.results[0].geometry.location.lng;
            console.log('lat and long below');
            console.log(latitude, longitude);
            console.log('component did mount');
            this.setState((previousState) => ({
              stores: [...previousState.stores, { lat: latitude, lng: longitude }],
            }));
          }, (error) => {
            console.error(error);
          },
        );
      } else {
        console.log('address was null');
      }
    });
  }

  // have to set API key for each Geocoding call?
  // otherwise i would put it in componentdidMount?
  renderMarkers = () => {
    // return (<Marker position={{ lat: 43.702813, lng: -72.288530 }} />
    // );

    // eslint-disable-next-line array-callback-return
    return this.props.listings.map((listing) => {
      if (listing.address !== '') {
        // Get latidude & longitude from address.
        Geocode.fromAddress(listing.address).then(
          (response) => {
            const latitude = response.results[0].geometry.location.lat;
            const longitude = response.results[0].geometry.location.lng;
            console.log('lat and long below');
            console.log(latitude, longitude);
            console.log(response.results[0].geometry.location);
            return (<Marker position={{ lat: latitude, lng: longitude }} />);
          },
          (error) => {
            console.error(error);
          },
        );
      } else {
        console.log('address was null');
      }
    });
  }

  getMarkers = () => {
    console.log('getMarkers');
    console.log(this.state.stores);
    return this.state.stores.map((store, index) => {
      console.log('returning marker');
      // eslint-disable-next-line react/no-array-index-key
      return (<Marker key={index} position={{ lat: store.latitude, lng: store.longitude }} />);
    });
  }

  renderTest = () => {
    console.log('render test');
    return (
      <Marker position={{ lat: 43.702813, lng: -72.288530 }} />
    );
  }

  renderTest2 = () => {
    console.log('render test');
    return (
      <Marker position={{ lat: 44.702813, lng: -72.288530 }} />
    );
  }

  renderMap = () => {
    if (this.state.stores.length > 0) {
      console.log(this.state.stores.length);
      return (
        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={{ lat: 43.702813, lng: -72.288530 }}
          style={mapStyles}
        >
          {/* {this.renderMarkers()} */}
          {this.getMarkers()}
          {this.renderTest()}
          {this.renderTest2()}
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
    console.log('rendering map');
    return (
      <div>
        {this.renderMap()}
      </div>
    );
  }
}

// map state to props? redux shi?
// eslint-disable-next-line new-cap
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4YOXX43hNkUFFtxLlALsnWk49LAlvz70',
})(MapContainer);
