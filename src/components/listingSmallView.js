import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';

class ListingSmallView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Link className="smallViewLink" to={`/listings/${this.props.listing.id}`}> {this.props.listing.address} </Link>
        <div className="smallView">
          <p className="name"> Posted by: { this.props.listing.renterName }</p>
          <p className="desc"> Description: { this.props.listing.description }</p>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ListingSmallView);
