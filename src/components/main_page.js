import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings, fetchUser, fetchFiltered } from '../actions/index';
import ListingSmallView from './listingSmallView';
import MapContainer from './googlemap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filts: 0,
      numberOfRooms: '',
      isFullApartment: false,
      term: '',
      lowerRent: '',
      upperRent: '',
    };
  }

  componentDidMount() {
    this.props.fetchListings();
    this.props.fetchUser(this.props.email);
  }

  termChange = (event) => {
    this.setState({ term: event.target.value });
  }

  roomsChange = (event) => {
    this.setState({ numberOfRooms: event.target.value });
  }

  fullChange = (event) => {
    this.setState({ isFullApartment: event.target.value });
  }

  lrentChange = (event) => {
    this.setState({ lowerRent: event.target.value });
  }

  urentChange = (event) => {
    this.setState({ upperRent: event.target.value });
  }

  filter = () => {
    this.setState({ filts: 1 });
  }

  dropClick = () => {
    document.getElementById('dd').style.display = 'block';
  }

  showListings() {
    return this.props.listings.map((listing) => {
      console.log(listing);
      return (<ListingSmallView key={listing.id} listing={listing} />);
    });
  }

  showFiltered() {
    const filts = { ...this.state };
    this.props.fetchFiltered(filts);
    console.log(this.props.filtered);
    return this.props.filtered.map((listing) => {
      console.log(listing);
      return (<ListingSmallView key={listing.id} listing={listing} />);
    });
  }

  showMap() {
    if (this.props.listings.length > 0) {
      return (
        <MapContainer listings={this.props.listings} />
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }

  backToMain() {
    this.setState({ filts: 0 });
  }

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    }

    if (this.state.filts === 1) {
      return (
        <div id="filt_cont">
          Filtered results:
          {this.showFiltered()} <p> </p>
          <button type="button" onClick={() => this.backToMain()}> Return to main page. </button>
        </div>
      );
    }

    console.log(`listings are ${this.props.listings}`);
    return (
      <div className="mainpage-flex">
        <div id="filt">
          <button type="button" onClick={() => this.dropClick()}> Filter by... </button>
          <div id="dd">
            Terms wanted (F/W/S/X), separated by comma: <input onChange={this.termChange} placeholder="term" /> <p> </p>
            # Rooms wanted: <input onChange={this.roomsChange} /> <p> </p>
            Full apartment/house wanted, enter false or true: <input onChange={this.fullChange} /> <p> </p>
            Min rent per month: <input onChange={this.lrentChange} />
            Max rent per month: <input onChange={this.urentChange} />
            <button type="button" onClick={() => this.filter()}> Filter listings. </button>
          </div>
        </div>
        <div className="maincontent">
          <div id="listings_cont">
            {this.showListings()}
          </div>
          {this.showMap()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  listings: reduxState.listings.all,
  email: reduxState.auth.email,
  filtered: reduxState.listings.filtered,
});

export default connect(mapStateToProps, { fetchListings, fetchUser, fetchFiltered })(Main);
