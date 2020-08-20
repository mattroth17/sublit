import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListing, updateListing, deleteListing } from '../actions';

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
      renterName: '',
      ammenities: [],
      email: '',
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

  remakeListing = () => {
    const listing = { ...this.state };
    this.props.updateListing(listing);
    this.props.history.push('/');
  }

  startEdits = () => {
    console.log(this.props.currentListing);
    this.setState({ ...this.props.currentListing }, () => {
      console.log(this.state);
      // NOTE: COMMENT THESE LINES if trouble w/ auth
      if (this.props.auth.user !== this.state.email) {
        return;
      }
      this.setState({ editing: 1 });
    });
  }

  render() {
    if (!this.props.currentListing) {
      return <div> Loading... </div>;
    }

    // need to add authorization for editing posts
    if (this.state.editing === 1) {
      return (
        <div className="edit_listing">
          <input onChange={this.onNameChange} placeholder={this.props.currentListing.renterName} />
          <input onChange={this.onAddressChange} placeholder={this.props.currentListing.address} />
          <input onChange={this.onDateChange} placeholder={this.props.currentListing.date} />
          <input onChange={this.onRentChange} placeholder={this.props.currentListing.rent} />
          <input onChange={this.onLenSubletChange} placeholder={this.props.currentListing.lenSublet} />
          <input onChange={this.onNumberOfRoomsChange} placeholder={this.props.currentListing.numberOfRooms} />
          <input onChange={this.onIsFullApartmentChange} placeholder={this.props.currentListing.isFullApartment} />
          <input onChange={this.onPicturesChangee} placeholder="Upload pictures" />
          <input onChange={this.onNumParkingSpacesChange} placeholder={this.props.currentListing.numParkingSpaces} />
          <input onChange={this.onNumBathsChange} placeholder={this.props.currentListing.numBaths} />
          <input onChange={this.onDescriptionChange} placeholder={this.props.currentListing.description} />
          <input onChange={this.onAmmenitiesChange} placeholder={this.props.currentListing.ammenities} />
          <button type="button" onClick={() => this.remakeListing()}> Update your listing. </button>
          <button type="button" onClick={() => this.props.deleteListing(this.props.match.params.listingID, this.props.history)}> Delete your listing. </button>
        </div>
      );
    }

    return (
      <div className="indlisting">
        <div id="title">
          <p>{this.props.currentListing.address}</p>
          <p>Rent: {this.props.currentListing.rent}</p>
          <p>Listed by: {this.props.currentListing.renterName}</p>
          {this.props.currentListing.description}
        </div>
        <ul>
          <li> Sublet duration: {this.props.currentListing.lenSublet} </li>
          <li> Rooms: {this.props.currentListing.numberOfRooms} </li>
          <li> Bathrooms: {this.props.currentListing.numBaths} </li>
          <li> Parking spaces: {this.props.currentListing.numParkingSpaces} </li>
          <li> Amenities: {this.props.currentListing.amenities} </li>
        </ul>
        <button type="button" onClick={() => this.startEdits()}> Your listing? Click here to edit. </button>
        <Link to="/chat"> Chat me </Link>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  currentListing: reduxState.listings.current,
  auth: reduxState.auth,
});

export default connect(mapStateToProps, { fetchListing, updateListing, deleteListing })(Listing);
