import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings } from '../actions/index';
import ListingSmallView from './listingSmallView';
import MapContainer from './googlemap';

class Main extends Component {
  componentDidMount() {
    this.props.fetchListings();
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
        <div>
          <MapContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  listings: reduxState.listings.all,
});

export default connect(mapStateToProps, { fetchListings })(Main);
