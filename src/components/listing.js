/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { isEmpty } from 'underscore';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  fetchListing, updateListing, deleteListing, startConversation, getConversation, sendError, fetchUser,
} from '../actions';
import './css_files/listing.scss';
import * as s3 from '../s3';

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
      ammenities: [],
      term: [],
      numPics: 1,
      editing: 0,
    };
  }

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.listingID);
    if (isEmpty(this.props.user)) {
      this.props.fetchUser(this.props.email);
    }
  }

  onStartDateChange = (event) => {
    this.setState({ date: event.target.value });
  }

  onEndDateChange = (event) => {
    this.setState({ date: event.target.value });
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
    const listing = { ...this.state };
    this.props.updateListing(listing);
  }

  startEdits = () => {
    this.setState({ ...this.props.currentListing }, () => {
      if (this.props.email !== this.props.currentListing.author.email) {
        return;
      }
      this.setState({ editing: 1, numPics: this.props.currentListing.pictures.length });
    });
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
      return <div> {`${t}`} </div>;
    });
  }

  renderImages() {
    if (!this.props.currentListing || isEmpty(this.props.currentListing)) {
      return <div> Loading... </div>;
    }
    console.log(this.props.currentListing);
    return this.props.currentListing.pictures.map((pic) => {
      return (<img key={pic} alt="" src={pic} />);
    });
  }

  renderImageInputs() {
    return (
      <div className="image-uploads">
        {_.range(this.state.numPics).map((pic) => {
          const imageCount = (pic > 0 ? 'Another Image' : 'Image');
          console.log(imageCount);
          const buttonText = `Upload ${imageCount}`;
          return (
            <div key={pic} className="custom-image-upload">
              <label htmlFor={pic} className="custom-image-upload-button">
                {buttonText}
                <input id={pic} type="file" name="coverImage" onChange={this.onImageUpload} />
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  renderPreviews() {
    return (
      <div className="image-previews">
        {this.state.pictures.map((pic) => {
          return (<img key={pic} id="preview" alt="" src={pic} />);
        })}
      </div>
    );
  }

  renderChatButton() {
    if (!isEmpty(this.props.currentListing)) {
      const authorEmail = this.props.currentListing.author.email;
      const hasConvo = this.props.user.conversations.some((convo) => convo.email === authorEmail);
      if (hasConvo) {
        return (<button type="submit" className="submit" onClick={() => this.goToConversation()}> Go to Conversation </button>);
      }
      return (<button type="submit" onClick={() => this.startConversation()}> Chat me </button>);
    }
    return <div />;
  }

  renderButtons() {
    if (!this.props.currentListing || isEmpty(this.props.currentListing)) {
      return <div> loading... </div>;
    }

    if (this.props.currentListing.author.email === this.props.email) {
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
    }
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

  render() {
    if (isEmpty(this.props.currentListing)) {
      return <div> Loading... </div>;
    }

    if (this.state.editing === 1) {
      return (
        <div className="edit_listing">
          <div className="form-boxes">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={(value) => this.setState({ address: value })}
              placeholder={`Address: ${this.props.currentListing.address}`}
            >
              {this.renderPlacesAutocomplete}
            </PlacesAutocomplete> <p> </p>
            <input onChange={this.onStartDateChange} type="date" placeholder={`Start Date: ${this.props.currentListing.startDate}`} /> <p> </p>
            <input onChange={this.onEndDateChange} type="date" placeholder={`End Date: ${this.props.currentListing.endDate}`} /> <p> </p>
            <input onChange={this.onRentChange} type="number" placeholder={`Rent: ${this.props.currentListing.rent}`} /> <p> </p>
            <input onChange={this.onNumberOfRoomsChange} placeholder={`Rooms: ${this.props.currentListing.numberOfRooms}`} /> <p> </p>
            <input onChange={this.onNumPeopleChange} placeholder={`Number of People: ${this.props.currentListing.numberOfPeople}`} /> <p> </p>
            <input onChange={this.onIsFullApartmentChange} placeholder={`Full? ${this.props.currentListing.isFullApartment}`} /> <p> </p>
            <input onChange={this.onNumParkingSpacesChange} placeholder={`Parking: ${this.props.currentListing.numParkingSpaces}`} /> <p> </p>
            <input onChange={this.onNumBathsChange} type="number" placeholder={`Baths: ${this.props.currentListing.numBaths}`} /> <p> </p>
            <input onChange={this.onDescriptionChange} placeholder={`Desc.: ${this.props.currentListing.description}`} /> <p> </p>
            <input onChange={this.onAmmenitiesChange} placeholder={`Amenities: ${this.props.currentListing.amenities}`} /> <p> </p>
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

    return (
      <div className="indlisting">
        <div className="leftColumn">
          <div id="title">
            <h2>{this.props.currentListing.address}</h2>
            <hr />
            <h3>Rent: {this.props.currentListing.rent}</h3>
            <h3>Listed by: {this.props.currentListing.author.firstName}</h3>
            <h3> Available from: {this.props.currentListing.startDate} to {this.props.currentListing.endDate} </h3>
            {this.props.currentListing.description}
          </div>
          <ul className="amenities">
            <li> Rooms: {this.props.currentListing.numberOfRooms} </li>
            <li> Bathrooms: {this.props.currentListing.numBaths} </li>
            <li> Parking spaces: {this.props.currentListing.numParkingSpaces} </li>
            <li> Amenities: {this.retAmms()} </li>
            <li> Is this a full apartment/house?  {fullHouse} </li>
          </ul>
        </div>
        <div className="rightColumn">
          <div className="listing-images">
            {this.renderImages()}
          </div>
          <div className="buttons">
            {this.renderButtons()}
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
