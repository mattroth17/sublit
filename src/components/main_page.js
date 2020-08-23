import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings, fetchUser } from '../actions/index';
import ListingSmallView from './listingSmallView';

class Main extends Component {
  componentDidMount() {
    this.props.fetchListings();
    this.props.fetchUser(this.props.email);
  }

  showListings() {
    return this.props.listings.map((listing) => {
      return (<ListingSmallView key={listing.id} listing={listing} />);
    });
  }

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    }
    return (
      <div>
        <div id="listings_cont">
          {this.showListings()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  listings: reduxState.listings.all,
  email: reduxState.auth.email,
});

export default connect(mapStateToProps, { fetchListings, fetchUser })(Main);
