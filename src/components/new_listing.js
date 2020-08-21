/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { createListing } from '../actions/index';

class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      address: '',
      rent: 0,
      lenSublet: 1,
      numberOfRooms: 0,
      isFullApartment: false,
      pictures: [],
      numParkingSpaces: 0,
      numBaths: 0,
      description: '',
      renterName: '',
      ammenities: [],
      email: '',
      images: [],
      term: '',
    };
  }

  // componentDidMount

  // what's the point of date?
  onDateChange = (event) => {
    this.setState({ date: event.target.value });
  }

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  onRentChange = (event) => {
    this.setState({ rent: event.target.value });
  }

  onLenSubletChange = (event) => {
    console.log(event.target.value);
    this.setState({ lenSublet: event.target.value });
  }

  onNumberOfRoomsChange = (event) => {
    this.setState({ numberOfRooms: event.target.value });
  }

  onIsFullApartmentChange = (event) => {
    this.setState({ isFullApartment: event.target.value });
  }

  onPicturesChangee = (event) => {
    this.setState({ pictures: event.target.value });
  }

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  onNumParkingSpacesChange = (event) => {
    this.setState({ numParkingSpaces: event.target.value });
  }

  onNumBathsChange = (event) => {
    this.setState({ numBaths: event.target.value });
  }

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  onNameChange = (event) => {
    this.setState({ renterName: event.target.value });
  }

  onAmmenitiesChange = (event) => {
    this.setState({ ammenities: event.target.value });
  }

  addImage = (file) => {
    this.state.pictures.push(file);
  }

  onTermsChange = (event) => {
    const checks = document.getElementsByName('term');
    const newterms = '';
    checks.forEach((check) => {
      if (check.checked) {
        console.log(check.value);
        newterms.push(check.value);
      }
    });
    this.setState({ term: newterms });
  }

  makeListing = (user) => {
    if (this.state.address === '') {
      console.log('need an address to make a posting');
      return;
    }
    this.setState({ email: user }, () => {
      const listing = { ...this.state };
      console.log(listing);
      this.props.createListing(listing, this.props.history);
      this.props.history.push('/');
    });
  }

  // adapted from this site: https://www.npmjs.com/package/react-places-autocomplete
  // used to auto-suggest addresses
  renderPlacesAutocomplete = ({
    getInputProps, getSuggestionItemProps, loading, suggestions,
  }) => (
    <div className="autocomplete-root">
      <input {...getInputProps()} placeholder="Address" />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
            <span key={suggestion.id}>{suggestion.description}</span>
          </div>
        ))}
      </div>
    </div>
  );

  render() {
    return (
      <div className="new_listing">
        <h2> Renter Name </h2>
        <input onChange={this.onNameChange} placeholder="Renter Name" value={this.state.renterName} />
        <h2> Address of Available Space </h2>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={(value) => this.setState({ address: value })}
        >
          {this.renderPlacesAutocomplete}
        </PlacesAutocomplete>
        <h2> Date? Not sure what this is for </h2>
        <input onChange={this.onDateChange} type="date" placeholder="Date" value={this.state.date} />
        <h2> Which term(s) are you looking to sublet? (need backend support if we want to use this) </h2>
        <div onChange={this.onTermsChange}>
          <input type="checkbox" value="F" name="term" /> Fall
          <input type="checkbox" value="W" name="term" /> Winter
          <input type="checkbox" value="S" name="term" /> Spring
          <input type="checkbox" value="X" name="term" /> Summer
        </div>
        <h2> Cost of Rent (per month e.g. &quot;1000&quot;) </h2>
        <input onChange={this.onRentChange} type="number" placeholder="Cost of Rent" value={this.state.rent} />
        <h2> Description of the Space </h2>
        <input onChange={this.onDescriptionChange} placeholder="Enter a short description of the space" value={this.state.description} />
        <h2> Length of Sublet (in months) </h2>
        <input onChange={this.onLenSubletChange} type="range" min="0" max="12" placeholder="Lenght of Sublet" value={this.state.lenSublet} />
        <div>{this.state.lenSublet} months</div>
        <h2> Number of Rooms </h2>
        <input onChange={this.onNumberOfRoomsChange} type="range" min="0" max="10" placeholder="Number of Rooms" value={this.state.numberOfRooms} />
        <div>{this.state.numberOfRooms} rooms</div>
        <h2> Number of Parking Spaces </h2>
        <input onChange={this.onNumParkingSpacesChange} type="range" min="0" max="5" placeholder="Number of Parking Spaces" value={this.state.numParkingSpaces} />
        <div>{this.state.numParkingSpaces} parking spaces</div>
        <h2> Number of bathrooms </h2>
        <input onChange={this.onNumBathsChange} type="range" min="0" max="5" placeholder="Number of Baths" value={this.state.numBaths} />
        <div>{this.state.numBaths} baths</div>
        <h2> List the Ammenities </h2>
        <input onChange={this.onAmmenitiesChange} placeholder="Ammenities" value={this.state.ammenities} />
        <h2> Is it an entire apartment/house? </h2>
        <div onChange={this.onIsFullApartmentChange}>
          <input type="radio" value="true" name="full" /> Yes
          <input type="radio" value="false" name="full" /> No
        </div>
        <h2> Upload Images of the Space - nonfunctional, currently </h2>
        <input type="file" onClick={() => this.addImage()} />
        <button type="button" onClick={() => this.makeListing(this.props.auth.user)}> Post your listing. </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
});

export default withRouter(connect(mapStateToProps, { createListing })(NewListing));
