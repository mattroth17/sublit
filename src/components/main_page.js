import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchListings } from '../actions';

class Main extends Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  render() {
    if (!this.props.listings) {
      return <div> Loading... </div>;
    }
    return (
      this.props.listings.map((listing) => {
        return (
          <div className="list_preview" key={listing.id}>
            <NavLink to={`listings/${listing.id}`} className="lt"> {listing.title} </NavLink>
            {listing.description}
            <img src={listing.pictures} alt="" />
          </div>
        );
      })
    );
  }
}

const mapStateToProps = (reduxState) => ({
  listings: reduxState.listings.all,
});

export default connect(mapStateToProps, { fetchListings })(Main);
