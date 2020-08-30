/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import _ from 'underscore';
import PlacesAutocomplete from 'react-places-autocomplete';
import { createListing, sendError } from '../actions/index';
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
      numberOfPeople: 0,
      isFullApartment: false,
      pictures: [],
      numParkingSpaces: 0,
      numBaths: 0,
      description: '',
      amenities: [],
      images: [],
      numPics: 1,
      previews: [],
      files: [],
    };
  }

  onStartDateChange = (event) => {
    this.setState({ startDate: event.target.value });
  }

  onEndDateChange = (event) => {
    this.setState({ endDate: event.target.value });
  }

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  onRentChange = (event) => {
    this.setState({ rent: event.target.value });
  }

  onNumPeopleChange = (event) => {
    this.setState({ numberOfPeople: event.target.value });
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
        newamms.push(check.value);
      }
    });
    this.setState({ amenities: newamms });
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState((prevState) => ({
        previews: [...prevState.previews, window.URL.createObjectURL(file)],
        files: [...prevState.files, file],
        numPics: prevState.numPics + 1,
      }));
    }
  }

  onChangeImageUpload = (file, i) => {
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      const newPreviews = this.state.previews.slice();
      newPreviews[i] = window.URL.createObjectURL(file);
      const newFiles = this.state.files.slice();
      newFiles[i] = file;
      this.setState(() => ({
        previews: newPreviews,
        files: newFiles,
      }));
    }
  }

  makeListing = () => {
    // eslint-disable-next-line consistent-return
    if (this.state.startDate === '' || this.state.endDate === '' || this.state.address === '' || this.state.description === '') {
      this.props.sendError('Error: must fill out all fields to post new listing');
      return;
    }
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
          this.props.sendError('Error uploading images');
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

  /* {_.range(this.state.numPics).map((pic) => {
          const imageCount = (pic > 0 ? 'Another Image' : 'Image');
          const buttonText = `Upload ${imageCount}`;
          return (
            <div key={pic} className="custom-image-upload">
              <label htmlFor={pic} className="custom-image-upload-button">
                {buttonText}
                <input id={pic} type="file" name="coverImage" onChange={this.onImageUpload} />
              </label>
            </div>
          );
        })} */

  renderImageInputs() {
    const imageCount = (this.state.numPics > 1 ? 'Another Image' : 'Image');
    const buttonText = `Upload ${imageCount}`;
    return (
      <div key="uploads" className="image-uploads">
        <div key="upload-button" className="custom-image-upload">
          <label htmlFor="upload-button" className="custom-image-upload-button">
            {buttonText}
            <input id="upload-button" type="file" name="coverImage" onChange={this.onImageUpload} />
          </label>
        </div>
      </div>
    );
  }

  renderPreviews() {
    return (
      <div key="previews" className="image-previews">
        {this.state.previews.map((pic, i) => {
          return (
            <div key={i} className="image-preview-and-input">
              <div key={i + 1} className="custom-image-upload">
                <label htmlFor={i} className="custom-image-upload-button">
                  Change Image
                  <input id={i} type="file" name="coverImage" onChange={(event) => this.onChangeImageUpload(event.target.files[0], i)} />
                </label>
              </div>
              <img key={i + 2} id="preview" alt="" src={pic} />
            </div>
          );
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
              <h2> Start Date </h2>
              <input onChange={this.onStartDateChange} type="date" placeholder="Date" value={this.state.startDate} />
              <h2> End Date </h2>
              <input onChange={this.onEndDateChange} type="date" placeholder="Date" value={this.state.endDate} />
            </div>
            <div className="rentInfo">
              <h2> Cost of Rent (per month in U.S. dollars e.g. &quot;1000&quot;) </h2>
              <input onChange={this.onRentChange} type="number" placeholder="Cost of Rent" value={this.state.rent} />
            </div>
            <div className="descriptionInfo">
              <h2> Description of the Space </h2>
              <input onChange={this.onDescriptionChange} placeholder="Enter a short description of the space" value={this.state.description} />
            </div>
            <div className="roomInfo">
              <h2> Number of Bedrooms </h2>
              <input onChange={this.onNumberOfRoomsChange} type="range" min="0" max="10" placeholder="Number of Rooms" value={this.state.numberOfRooms} />
              <div>{this.state.numberOfRooms} rooms</div>
            </div>
            <div className="peopleInfo">
              <h2> Number of People that Can Stay in the Space </h2>
              <input onChange={this.onNumPeopleChange} type="range" min="0" max="10" placeholder="Number of Rooms" value={this.state.numberOfPeople} />
              <div>{this.state.numberOfPeople} people</div>
            </div>
            <div className="parkingInfo">
              <h2> Number of Parking Spaces </h2>
              <input onChange={this.onNumParkingSpacesChange} type="range" min="0" max="5" placeholder="Number of Parking Spaces" value={this.state.numParkingSpaces} />
              <div>{this.state.numParkingSpaces} parking spaces</div>
            </div>
            <div className="bathroomInfo">
              <h2> Number of Bathrooms </h2>
              <input onChange={this.onNumBathsChange} type="range" min="0" max="5" placeholder="Number of Baths" value={this.state.numBaths} />
              <div>{this.state.numBaths} baths</div>
            </div>
            <div className="amenityInfo">
              <h2> List the Ammenities </h2>
              <div className="amms" onChange={this.onAmmenitiesChange}>
                <div className="checkbox-container">
                  <input type="checkbox" value="wifi" name="term" /> <span>wifi</span>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" value="laundry service or washer/dryer" name="term" />
                  <span>laundry service or washer/dryer</span>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" value="tv" name="term" />
                  <span>tv</span>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" value="coffee or tea maker" name="term" />
                  <span>coffee or tea maker</span>
                </div>
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

export default withRouter(connect(mapStateToProps, { createListing, sendError })(NewListing));
