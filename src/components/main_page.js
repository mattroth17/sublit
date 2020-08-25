import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    } else {
      console.log(`listings are ${this.props.listings}`);
      return (
        <div className="mainpage-flex">
          <div id="listings_cont">
            {this.showListings()}
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
