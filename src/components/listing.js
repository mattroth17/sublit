/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  fetchListing, updateListing, deleteListing, startConversation, getConversation,
} from '../actions';
import './css_files/listing.scss';


class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: 0,
      address: '',
      rent: 0,
      lenSublet: '',
      numberOfRooms: 0,
      isFullApartment: false,
      pictures: [],
      numParkingSpaces: 0,
      numBaths: 0,
      description: '',
      ammenities: [],
      email: '',
      term: [],
    };
  }

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.listingID);
  }

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
    this.setState({ term: event.target.value });
  }

  onNumberOfRoomsChange = (event) => {
    this.setState({ numberOfRooms: event.target.value });
  }

  onIsFullApartmentChange = (event) => {
    this.setState({ isFullApartment: event.target.value });
  }

  // append pictures w/ file adds?
  onPicturesChangee = (event) => {
    // this.setState({ pictures: event.target.value });
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

  remakeListing = () => {
    const listing = { ...this.state };
    this.props.updateListing(listing);
    this.props.history.push('/');
  }

  startEdits = () => {
    console.log('starting edits');
    this.setState({ ...this.props.currentListing }, () => {
      // NOTE: COMMENT THESE LINES if trouble w/ auth
      if (this.props.auth.user !== this.state.email) {
        return;
      }
      this.setState({ editing: 1 });
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

  retTerms() {
    if (!this.props.currentListing || isEmpty(this.props.currentListing)) {
      return <div> loading... </div>;
    }

    return this.props.currentListing.term.map((t) => {
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

  renderChatButton() {
    if (!isEmpty(this.props.currentListing)) {
      const authorEmail = this.props.currentListing.author.email;
      const hasConvo = this.props.user.conversations.some((convo) => convo.email === authorEmail);
      if (hasConvo) {
        return (<button type="submit" onClick={() => this.goToConversation()}> Go to Conversation </button>);
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
        <li key="chat">
          {this.renderChatButton()}
        </li>
      </ul>
    );
  }

  render() {
    if (isEmpty(this.props.currentListing)) {
      return <div> Loading... </div>;
    }

    console.log('rendering editing');
    if (this.state.editing === 1) {
      return (
        <div className="edit_listing">
          <div className="form-boxes">
            <input onChange={this.onNameChange} placeholder={`Name: ${this.props.currentListing.renterName}`} /> <p> </p>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={(value) => this.setState({ address: value })}
              placeholder={`Address: ${this.props.currentListing.address}`}
            >
              {this.renderPlacesAutocomplete}
            </PlacesAutocomplete> <p> </p>
            <input onChange={this.onDateChange} type="date" placeholder={`Date Posted: ${this.props.currentListing.date}`} /> <p> </p>
            <input onChange={this.onRentChange} type="number" placeholder={`Rent: ${this.props.currentListing.rent}`} /> <p> </p>
            <input onChange={this.onLenSubletChange} placeholder={`Length: ${this.props.currentListing.lenSublet}`} /> <p> </p>
            <input onChange={this.onNumberOfRoomsChange} placeholder={`Rooms: ${this.props.currentListing.numberOfRooms}`} /> <p> </p>
            <input onChange={this.onIsFullApartmentChange} placeholder={`Full? ${this.props.currentListing.isFullApartment}`} /> <p> </p>
            <input onChange={this.onPicturesChangee} placeholder="Upload pictures - not currently functional" /> <p> </p>
            <input onChange={this.onNumParkingSpacesChange} placeholder={`Parking: ${this.props.currentListing.numParkingSpaces}`} /> <p> </p>
            <input onChange={this.onNumBathsChange} type="number" placeholder={`Baths: ${this.props.currentListing.numBaths}`} /> <p> </p>
            <input onChange={this.onDescriptionChange} placeholder={`Desc.: ${this.props.currentListing.description}`} /> <p> </p>
            <input onChange={this.onAmmenitiesChange} placeholder={`Amenities: ${this.props.currentListing.ammenities}`} /> <p> </p>
          </div>
          <div className="radio">
            <h2> Is it an entire apartment/house? </h2>
            <div onChange={this.onIsFullApartmentChange}>
              <input type="radio" value="true" name="full" /> Yes
              <input type="radio" value="false" name="full" /> No
            </div>
          </div>
          <div className="edit-buttons">
            <button type="button" onClick={() => this.remakeListing()}> Update your listing. </button>
            <button type="button" onClick={() => this.props.deleteListing(this.props.match.params.listingID, this.props.history)}> Delete your listing. </button>
          </div>
        </div>
      );
    }

    return (
      <div className="indlisting">
        <div className="leftColumn">
          <div id="title">
            <h2>{this.props.currentListing.address}</h2>
            <hr />
            <h3>Rent: {this.props.currentListing.rent}</h3>
            <h3>Listed by: {this.props.currentListing.renterName}</h3>
            <div id="terms"><h3>Terms available: </h3> {this.retTerms()} </div>
            <h3>{this.props.currentListing.description}</h3>
          </div>
          <ul className="amenities">
            <li> Rooms: {this.props.currentListing.numberOfRooms} </li>
            <li> Bathrooms: {this.props.currentListing.numBaths} </li>
            <li> Parking spaces: {this.props.currentListing.numParkingSpaces} </li>
            <li> Amenities: {this.props.currentListing.ammenities} </li>
            <li> Full? {this.props.currentListing.isFullApartment} </li>
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
  fetchListing, updateListing, deleteListing, startConversation, getConversation,
})(Listing);
