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
      <Link className="smallViewLink" to={`/listings/${this.props.listing.id}`}>
        <div className="smallView">
          <p className="name">{ this.props.listing.renterName }</p>
          <p className="desc">{ this.props.listing.description }</p>
        </div>
      </Link>
    );
  }
}

export default connect(null, null)(ListingSmallView);
