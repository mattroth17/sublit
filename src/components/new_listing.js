/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'underscore';
import PlacesAutocomplete from 'react-places-autocomplete';
import { createListing } from '../actions/index';
import * as s3 from '../s3';

class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePosted: '',
      address: '',
      rent: 0,
      numberOfRooms: 0,
      isFullApartment: false,
      pictures: [],
      numParkingSpaces: 0,
      numBaths: 0,
      description: '',
      ammenities: [],
      images: [],
      term: [],
      numPics: 1,
      previews: [],
      files: [],
    };
  }

  // componentDidMount

  // what's the point of date?
  onDateChange = (event) => {
    this.setState({ datePosted: event.target.value });
  }

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  onRentChange = (event) => {
    this.setState({ rent: event.target.value });
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

  onAmmenitiesChange = (event) => {
    this.setState({ ammenities: event.target.value });
  }

  onTermsChange = (event) => {
    const checks = document.getElementsByName('term');
    const newterms = [];
    checks.forEach((check) => {
      if (check.checked) {
        console.log(check.value);
        newterms.push(check.value);
      }
    });
    this.setState({ term: newterms });
  }

  // for image uploading
  incrementPics = () => {
    if (this.state.numPics === this.state.previews.length) {
      this.setState((prevState) => {
        return { numPics: prevState.numPics + 1 };
      });
    }
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState((prevState) => ({
        previews: [...prevState.previews, window.URL.createObjectURL(file)],
        files: [...prevState.files, file],
      }));
    }
  }

  makeListing = () => {
    if (this.state.files.length > 0) {
      const promises = [];
      this.state.files.forEach((file) => {
        promises.push(s3.uploadImage(file));
      });
      Promise.all(promises).then((urls) => {
        if (urls.length === this.state.files.length) {
          const listing = { ...this.state, pictures: urls };
          this.props.createListing(listing, this.props.history);
        } else {
          console.log('error uploading images');
        }
      });
    } else {
      const listing = { ...this.state };
      this.props.createListing(listing, this.props.history);
    }
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
          <div {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
    </div>
  );

  renderImageInputs() {
    return (
      <div className="image-uploads">
        {_.range(this.state.numPics).map((pic) => {
          return (<input key={pic} type="file" name="coverImage" onChange={this.onImageUpload} />);
        })}
      </div>
    );
  }

  renderPreviews() {
    return (
      <div className="image-previews">
        {this.state.previews.map((pic) => {
          return (<img key={pic} id="preview" alt="" src={pic} />);
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="new_listing">
        <h2> Address of Available Space </h2>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={(value) => this.setState({ address: value })}
        >
          {this.renderPlacesAutocomplete}
        </PlacesAutocomplete>
        <h2> Date? Not sure what this is for </h2>
        <input onChange={this.onDateChange} type="date" placeholder="Date" value={this.state.datePosted} />
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
        <h2> Upload Images of the Sapce </h2>
        {this.renderPreviews()}
        {this.renderImageInputs()}
        <button type="submit" onClick={this.incrementPics}>Upload another picture</button>
        <button type="button" onClick={() => this.makeListing()}> Post your listing. </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
});

export default withRouter(connect(mapStateToProps, { createListing })(NewListing));
