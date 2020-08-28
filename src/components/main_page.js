/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { fetchListings, fetchUser } from '../actions/index';
import ListingSmallView from './listingSmallView';
import MapContainer from './googlemap';

class Main extends Component {
  componentDidMount() {
    this.props.fetchListings();
    this.props.fetchUser(this.props.email);
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
        notSelected.style.backgroundColor = 'lightblue';
      }
    });
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

  showMap() {
    if (this.props.listings.length > 0) {
      return (
        <MapContainer listings={this.props.listings} testCallback={this.testCallback} />
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    } else {
      console.log(`listings are ${this.props.listings}`);
      return (
        <div className="mainpage-flex">
          <div id="listings-div">
            <List id="listings-list">
              {this.showListings()}
            </List>
          </div>
          <div>
            {this.showMap()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  listings: reduxState.listings.all,
  email: reduxState.auth.email,
});

export default connect(mapStateToProps, { fetchListings, fetchUser })(Main);
