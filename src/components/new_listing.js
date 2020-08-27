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
      startDate: '',
      endDate: '',
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
      numPics: 1,
      previews: [],
      files: [],
    };
  }

  // componentDidMount

  // what's the point of date?
  onSDateChange = (event) => {
    this.setState({ startDate: event.target.value });
  }

  onEDateChange = (event) => {
    this.setState({ endDate: event.target.value });
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
    const checks = document.getElementsByName('term');
    const newamms = [];
    checks.forEach((check) => {
      if (check.checked) {
        console.log(check.value);
        newamms.push(check.value);
      }
    });
    console.log(newamms);
    this.setState({ ammenities: newamms });
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
      console.log(listing);
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
      <div className="allListing">
        <div className="new_listing">
          <div className="allListings">
            <div className="addressInfo">
              <h2> Address of Available Space </h2>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={(value) => this.setState({ address: value })}
              >
                {this.renderPlacesAutocomplete}
              </PlacesAutocomplete>
            </div>
            <div className="dateInfo">
              <h2> Start date of sublet </h2>
              <input onChange={this.onSDateChange} type="date" placeholder="Date" value={this.state.datePosted} />
              <h2> End date of sublet </h2>
              <input onChange={this.onEDateChange} type="date" placeholder="Date" value={this.state.datePosted} />
            </div>
            <div className="rentInfo">
              <h2> Cost of Rent (per month e.g. &quot;1000&quot;) </h2>
              <input onChange={this.onRentChange} type="number" placeholder="Cost of Rent" value={this.state.rent} />
            </div>
            <div className="descriptionInfo">
              <h2> Description of the Space </h2>
              <input onChange={this.onDescriptionChange} placeholder="Enter a short description of the space" value={this.state.description} />
            </div>
            <div className="lengthInfo">
              <h2> Length of Sublet (in months) </h2>
              <input onChange={this.onLenSubletChange} type="range" min="0" max="12" placeholder="Lenght of Sublet" value={this.state.lenSublet} />
              <div>{this.state.lenSublet} months</div>
            </div>
            <div className="roomInfo">
              <h2> Number of Rooms </h2>
              <input onChange={this.onNumberOfRoomsChange} type="range" min="0" max="10" placeholder="Number of Rooms" value={this.state.numberOfRooms} />
              <div>{this.state.numberOfRooms} rooms</div>
            </div>
            <div className="parkingInfo">
              <h2> Number of Parking Spaces </h2>
              <input onChange={this.onNumParkingSpacesChange} type="range" min="0" max="5" placeholder="Number of Parking Spaces" value={this.state.numParkingSpaces} />
              <div>{this.state.numParkingSpaces} parking spaces</div>
            </div>
            <div className="bathroomInfo">
              <h2> Number of bathrooms </h2>
              <input onChange={this.onNumBathsChange} type="range" min="0" max="5" placeholder="Number of Baths" value={this.state.numBaths} />
              <div>{this.state.numBaths} baths</div>
            </div>
            <div className="amenityInfo">
              <h2> List the Ammenities </h2>
              <div className="amms" onChange={this.onAmmenitiesChange}>
                <input type="checkbox" value="wifi" name="term" /> wifi
                <input type="checkbox" value="laundry service or washer/dryer" name="term" /> laundry service or washer/dryer
                <input type="checkbox" value="tv" name="term" /> tv
                <input type="checkbox" value="coffe or tea maker" name="term" /> coffee or tea maker
              </div>
            </div>
            <div className="entireAPTInfo">
              <h2> Is it an entire apartment/house? </h2>
              <div className="houseAPTtext" onChange={this.onIsFullApartmentChange}>
                <input type="radio" value="true" name="full" /> Yes
                <input type="radio" value="false" name="full" /> No
              </div>
            </div>
            <div className="imageUpload">
              <h2> Upload Images of the Space </h2>
              {this.renderPreviews()}
              {this.renderImageInputs()}
              <button type="submit" onClick={this.incrementPics}>Upload another picture</button>
            </div>
            <button id="largeSubmit" type="button" onClick={() => this.makeListing()}> Post your listing. </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
});

export default withRouter(connect(mapStateToProps, { createListing })(NewListing));
