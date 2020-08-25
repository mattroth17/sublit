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

  showListings() {
    return this.props.listings.map((listing) => {
      console.log(listing);
      return (
        <div key={listing.id}>
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
          {this.showMap()}
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
