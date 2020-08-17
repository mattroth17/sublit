import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createListing } from '../actions/index';

class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
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
    };
  }

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

  makeListing = () => {
    const listing = { ...this.state };
    this.props.createListing(listing, this.props.history);
  }

  render() {
    return (
      <div className="new_listing">
        <input onChange={this.onNameChange} placeholder="Renter Name" value={this.state.renterName} />
        <input onChange={this.onAddressChange} placeholder="Address of Renting Space" value={this.state.address} />
        <input onChange={this.onDateChange} placeholder="Date" value={this.state.date} />
        <input onChange={this.onRentChange} placeholder="Cost of Rent" value={this.state.rent} />
        <input onChange={this.onLenSubletChange} placeholder="Lenght of Sublet" value={this.state.lenSublet} />
        <input onChange={this.onNumberOfRoomsChange} placeholder="Number of Rooms" value={this.state.numberOfRooms} />
        <input onChange={this.onIsFullApartmentChange} placeholder="Is it a full apartment?" value={this.state.isFullApartment} />
        <input onChange={this.onPicturesChangee} placeholder="Upload pictures" />
        <input onChange={this.onNumParkingSpacesChange} placeholder="Number of Parking Spaces" value={this.state.numParkingSpaces} />
        <input onChange={this.onNumBathsChange} placeholder="Number of Baths" value={this.state.numBaths} />
        <input onChange={this.onDescriptionChange} placeholder="Enter a short description of the space" value={this.state.description} />
        <input onChange={this.onAmmenitiesChange} placeholder="Ammenities" value={this.state.ammenities} />
        <button type="button" onClick={() => this.makeListing()}> Post your listing. </button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createListing })(NewListing));
