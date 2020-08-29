/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { fetchListings, fetchUser, fetchFiltered } from '../actions/index';
import ListingSmallView from './listingSmallView';
import MapContainer from './googlemap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filts: 0,
      numberOfRooms: '',
      isFullApartment: '',
      startDate: '',
      endDate: '',
      lowerRent: '',
      upperRent: '',
    };
  }

  componentDidMount() {
    this.props.fetchListings();
    this.props.fetchUser(this.props.email);
  }

  startDate = (event) => {
    this.setState({ startDate: event.target.value });
  }

  endDate = (event) => {
    this.setState({ endDate: event.target.value });
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
    this.setState({
      numberOfRooms: '',
      isFullApartment: '',
      startDate: '',
      endDate: '',
      lowerRent: '',
      upperRent: '',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  testCallback(target, listings) {
    console.log('mainpage testCallback');
    console.log(target.title);
    // eslint-disable-next-line array-callback-return
    listings.map((listing) => {
      if (listing.id === target.title) {
        const selected = document.getElementById(target.title);
        selected.style.backgroundColor = 'lightcoral';
      } else {
        const notSelected = document.getElementById(listing.id);
        notSelected.style.backgroundColor = 'transparent';
      }
    });
    const preview = document.getElementById('housePreview');
    preview.style.display = 'block';
  }

  showListings() {
    return this.props.listings.map((listing) => {
      console.log(listing);
      return (
        <div key={listing.id} id={listing.id}>
          <Link className="smallViewLink" to={`/listings/${listing.id}`}>
            <ListItem button>
              <ListingSmallView key={listing.id} listing={listing} />
            </ListItem>
            <Divider />
          </Link>
        </div>

      );
    });
  }

  showFiltered() {
    const filts = { ...this.state };
    this.props.fetchFiltered(filts);
    return this.props.filtered.map((listing) => {
      console.log(listing);
      return (
        <div key={listing.id} id={listing.id}>
          <Link className="smallViewLink" to={`/listings/${listing.id}`}>
            <ListItem button>
              <ListingSmallView key={listing.id} listing={listing} />
            </ListItem>
            <Divider />
          </Link>
        </div>
      );
    });
  }

  showMap() {
    if (this.props.listings.length > 0) {
      console.log('returning map');
      return (
        <MapContainer listings={this.props.listings} testCallback={this.testCallback} />
      );
    } else {
      console.log('loading map');
      return (
        <div>
          Loading...
        </div>
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  showPreview() {
    console.log('show preview');
  }

  // eslint-disable-next-line class-methods-use-this
  closeModal() {
    console.log('close modal');
    const modal = document.getElementById('dd');
    modal.style.display = 'none';
  }

  backToMain() {
    this.setState({ filts: 0 });
  }

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    }

    if (this.state.filts === 1) {
      console.log('filtering if statement?');
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
      <div>
        <div id="filt">
          <button type="button" id="filter-btn" onClick={() => this.dropClick()}> Filter by... </button>
          <div id="dd" className="modal-filter">
            <button className="close" type="button" onClick={() => this.closeModal()}>&times;</button>
            Earliest start date: <input onChange={this.startDate} type="date" /> <p> </p>
            Latest end date: <input onChange={this.endDate} type="date" /> <p> </p>
            # Rooms wanted: <input onChange={this.roomsChange} /> <p> </p>
            Full apartment/house wanted, enter false or true: <input onChange={this.fullChange} /> <p> </p>
            Min rent per month: <input onChange={this.lrentChange} />
            Max rent per month: <input onChange={this.urentChange} />
            <button type="button" onClick={() => this.filter()}> Filter listings. </button>
          </div>
          <div id="housePreview">
            {this.showPreview()}
          </div>
        </div>
        <div className="mainpage-flex">
          <div className="mainpage-flex">
            <div>
              {this.showMap()}
            </div>
            <div id="listings-div">
              {this.showListings()}
            </div>
          </div>
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
