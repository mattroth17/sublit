/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
import PlacesAutocomplete from 'react-places-autocomplete';
import moment from 'moment';
import Carousel from 'react-image-carousel';
import {
  fetchListing, updateListing, deleteListing, startConversation, getConversation, sendError, fetchUser,
} from '../actions';
import './css_files/listing.scss';
import * as s3 from '../s3';

require('../../node_modules/react-image-carousel/lib/css/main.min.css');

class Listing extends Component {
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
      numPics: 1,
      editing: 0,
    };
  }

  componentDidMount() {
    if (isEmpty(this.props.user)) {
      this.props.fetchUser(this.props.email);
    }
    this.props.fetchListing(this.props.match.params.listingID);
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

  onNumberOfRoomsChange = (event) => {
    this.setState({ numberOfRooms: event.target.value });
  }

  onIsFullApartmentChange = (event) => {
    this.setState({ isFullApartment: event.target.value });
  }

  onNumParkingSpacesChange = (event) => {
    this.setState({ numParkingSpaces: event.target.value });
  }

  onNumPeopleChange = (event) => {
    this.setState({ numberOfPeople: event.target.value });
  }

  onNumBathsChange = (event) => {
    this.setState({ numBaths: event.target.value });
  }

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  onAmmenitiesChange = (event) => {
    this.setState({ amenities: event.target.value });
  }

  remakeListing = () => {
    const listing = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      address: this.state.address,
      rent: this.state.rent,
      numberOfRooms: this.state.numberOfRooms,
      numberOfPeople: this.state.numberOfPeople,
      isFullApartment: this.state.isFullApartment,
      pictures: this.state.pictures,
      numParkingSpaces: this.state.numParkingSpaces,
      numBaths: this.state.numBaths,
      description: this.state.description,
      amenities: this.state.amenities,
    };
    this.props.updateListing(listing, this.props.match.params.listingID, () => {
      this.setState({ editing: 0 });
    });
  }

  startEdits = () => {
    if (this.props.email === this.props.currentListing.author.email) {
      console.log(this.props.currentListing.startDate);
      this.setState({
        editing: 1,
        numPics: 1 + this.props.currentListing.pictures.length,
        startDate: this.props.currentListing.startDate,
        endDate: this.props.currentListing.endDate,
        address: this.props.currentListing.address,
        rent: this.props.currentListing.rent,
        numberOfRooms: this.props.currentListing.numberOfRooms,
        numberOfPeople: this.props.currentListing.numberOfPeople,
        isFullApartment: this.props.currentListing.isFullApartment,
        pictures: this.props.currentListing.pictures,
        numParkingSpaces: this.props.currentListing.numParkingSpaces,
        numBaths: this.props.currentListing.numBaths,
        description: this.props.currentListing.description,
        amenities: this.props.currentListing.amenities,
      });
    }
  }

  deleteListing = (event) => {
    this.props.deleteListing(this.props.match.params.listingID, this.props.history);
  };

  goBack = (event) => {
    this.props.history.push('/');
  }

  startConversation = () => {
    this.props.startConversation(this.props.user, this.props.currentListing.author, this.props.history);
  }

  goToConversation = () => {
    const email = this.props.currentListing.author;
    const firstName = this.props.currentListing.author;
    this.props.getConversation({ email, firstName }, this.props.user.email, email);
    this.props.history.push('/chat');
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    if (file) {
      s3.uploadImage(file).then((url) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, url],
          numPics: prevState.numPics + 1,
        }));
      }).catch((error) => {
        this.props.sendError('Error uploading image. Try Again.');
      });
    }
  }

  onChangeImageUpload = (file, i) => {
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      s3.uploadImage(file).then((url) => {
        const newPictures = this.state.pictures.slice();
        newPictures[i] = url;
        this.setState((prevState) => ({
          pictures: newPictures,
        }));
      }).catch((error) => {
        console.log(error);
        this.props.sendError('Error uploading image. Try Again.');
      });
    }
  }

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

  retAmms() {
    if (!this.props.currentListing || isEmpty(this.props.currentListing.amenities)) {
      return <div> none listed </div>;
    }

    return this.props.currentListing.amenities.map((t) => {
      return <li key={t}> {`${t}`} </li>;
    });
  }

  renderImages() {
    if (!this.props.currentListing) {
      return <div>Loading...</div>;
    }
    if (isEmpty(this.props.currentListing.pictures)) {
      return <div> </div>;
    }

    return (
      <Carousel images={this.props.currentListing.pictures} />
    );
  }

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
        {this.state.pictures.map((pic, i) => {
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

  renderChatButton() {
    if (!isEmpty(this.props.currentListing)) {
      const authorEmail = this.props.currentListing.author.email;
      const hasConvo = this.props.user.conversations.some((convo) => convo.email === authorEmail);
      if (hasConvo) {
        return (<button type="submit" className="submit" onClick={() => this.goToConversation()}> <i className="fas fa-comments" /> </button>);
      }
      return (<button type="submit" onClick={() => this.startConversation()}> <i className="fas fa-comments" /> </button>);
    }
    return <div />;
  }

  renderButtons() {
    if (!this.props.currentListing || isEmpty(this.props.currentListing)) {
      return <div>Loading...</div>;
    } else if (this.props.currentListing.author.email === this.props.email) {
      console.log(this.props.currentListing.author.email);
      console.log(this.props.email);
      return (
        <ul className="icon-list">
          <li key="return" onClick={this.goBack}>
            <i className="fas fa-chevron-left" />
          </li>
          <li key="edit" onClick={this.startEdits}>
            <i className="fas fa-edit" />
          </li>
          <li key="delete" onClick={this.deleteListing}>
            <i className="fas fa-trash-alt" />
          </li>
        </ul>
      );
    } else {
      console.log(this.props.currentListing.author.email);
      console.log(this.props.email);
      return (
        <ul className="icon-list">
          <li key="return" onClick={this.goBack}>
            <i className="fas fa-chevron-left" />
          </li>
          <li key="chat" className="chatbutton">
            {this.renderChatButton()}
          </li>
        </ul>
      );
    }
  }

  render() {
    if (isEmpty(this.props.currentListing)) {
      return (<div>Loading...</div>);
    }

    if (this.state.editing) {
      return (
        <div className="edit_listing">
          <div className="form-boxes">
            <h2> Addres </h2>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={(value) => this.setState({ address: value })}
              placeholder={`Address: ${this.props.currentListing.address}`}
            >
              {this.renderPlacesAutocomplete}
            </PlacesAutocomplete> <p> </p>
            <h2> Start Date </h2>
            <input onChange={this.onStartDateChange} type="date" placeholder={`Start Date: ${this.props.currentListing.startDate}`} value={this.state.startDate} /> <p> </p>
            <h2> End Date </h2>
            <input onChange={this.onEndDateChange} type="date" value={this.state.endDate} /> <p> </p>
            <h2> Cost of Rent (in U.S. dollars per month) </h2>
            <input onChange={this.onRentChange} type="number" placeholder={`Rent: ${this.props.currentListing.rent}`} value={this.state.rent} /> <p> </p>
            <h2> Number of Bedrooms </h2>
            <input onChange={this.onNumberOfRoomsChange} type="range" max="10" min="0" value={this.state.numberOfRooms} />
            <div>{this.state.numberOfRooms} rooms</div> <p> </p>
            <h2> Number of People </h2>
            <input onChange={this.onNumPeopleChange} type="range" max="10" min="0" value={this.state.numberOfPeople} />
            <div>{this.state.numberOfPeople} people</div> <p> </p>
            <h2> Number of Parking Spaces </h2>
            <input onChange={this.onNumParkingSpacesChange} type="range" max="10" min="0" value={this.state.numParkingSpaces} />
            <div>{this.state.numParkingSpaces} parking spaces</div> <p> </p>
            <h2> Number of Bathrooms </h2>
            <input onChange={this.onNumBathsChange} type="range" max="10" min="0" value={this.state.numBaths} />
            <div>{this.state.numBaths} bathrooms</div> <p> </p>
            <h2> A Short Description </h2>
            <input onChange={this.onDescriptionChange} placeholder={`Desc.: ${this.props.currentListing.description}`} value={this.state.description} /> <p> </p>
            <h2> Amenities </h2>
            <input onChange={this.onAmmenitiesChange} placeholder={`Amenities: ${this.props.currentListing.amenities}`} value={this.state.amenities} /> <p> </p>
          </div>
          <div className="radio">
            <h2> Is it an entire apartment/house? </h2>
            <div onChange={this.onIsFullApartmentChange}>
              <input type="radio" value="true" name="full" /> Yes
              <input type="radio" value="false" name="full" /> No
            </div>
          </div>
          <div className="imageUpload">
            <h2> Upload More Images of the Space </h2>
            {this.renderPreviews()}
            {this.renderImageInputs()}
          </div>
          <div className="edit-buttons">
            <button type="button" onClick={() => this.remakeListing()}> Update your listing. </button>
            <button type="button" onClick={() => this.props.deleteListing(this.props.match.params.listingID, this.props.history)}> Delete your listing. </button>
          </div>
        </div>
      );
    }

    let fullHouse = 'No';
    if (this.props.currentListing.isFullApartment) {
      fullHouse = 'Yes';
    }

    const sDate = moment(this.props.currentListing.startDate).format('MMMM Do YYYY');
    const eDate = moment(this.props.currentListing.endDate).format('MMMM Do YYYY');

    return (
      <div className="indlisting">
        <div className="leftColumn">
          <div id="title">
            <h2>{this.props.currentListing.address}</h2>
            <div className="row-list">
              <span>{`${this.props.currentListing.numberOfPeople} people `}</span>
              <span className="bullet" aria-hidden="true"> · </span>
              <span>{`${this.props.currentListing.numberOfRooms} rooms `}</span>
              <span className="bullet" aria-hidden="true"> · </span>
              <span>{`${this.props.currentListing.numBaths} bathrooms `}</span>
              <span className="bullet" aria-hidden="true"> · </span>
              <span>{`${this.props.currentListing.numParkingSpaces} parking spots `}</span>
            </div>
            <hr />
            <div className="rent-container">
              <i className="fas fa-money-check-alt" />
              <h3 className="rent-and-renter">{`$${this.props.currentListing.rent} / month and hosted by ${this.props.currentListing.author.firstName}`}</h3>
            </div>
            <hr />
            <div className="dates">
              <i className="fas fa-calendar-alt" />
              <h3>{`${sDate} to ${eDate}`} </h3>
            </div>
            <hr />
            <div className="description">
              {this.props.currentListing.description}
            </div>
          </div>
          <hr />
          <div className="amenities">
            <h3>Amenities</h3>
            <ul>
              {this.retAmms()}
              <li key="full">{`Full Apartment: ${fullHouse}`}</li>
            </ul>
          </div>
          <div className="buttons">
            {this.renderButtons()}
          </div>
        </div>
        <div className="rightColumn">
          <div className="listing-images">
            {this.renderImages()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  currentListing: reduxState.listings.current,
  auth: reduxState.auth.authenticated,
  email: reduxState.auth.email,
  user: reduxState.auth.user,
});

export default connect(mapStateToProps, {
  fetchListing, updateListing, deleteListing, startConversation, getConversation, sendError, fetchUser,
})(Listing);
