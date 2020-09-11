import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';

class ListingSmallView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderAdditionalInfo = () => {
    if (this.props.filtered) {
      return (
        <div className="row-list">
          <span>{`${this.props.listing.numberOfPeople} people `}</span>
          <span className="bullet" aria-hidden="true"> · </span>
          <span>{`${this.props.listing.numberOfRooms} rooms `}</span>
          <span className="bullet" aria-hidden="true"> · </span>
          <span>{`${this.props.listing.numBaths} bathrooms `}</span>
          <span className="bullet" aria-hidden="true"> · </span>
          <span>{`${this.props.listing.numParkingSpaces} parking spots `}</span>
          <span className="bullet" aria-hidden="true"> · </span>
          <span>{`$${this.props.listing.rent} / month `}</span>
        </div>
      );
    }
    return <p />;
  }

  render() {
    if (this.props.listing.description.length < 55) {
      return (
        <div className="smallview-outer">
          {this.props.listing.address}.
          <div className="smallView">
            <p className="name"> Posted by: { this.props.listing.author.firstName }</p>
            <p className="desc"> Description: { this.props.listing.description }</p>
            {this.renderAdditionalInfo()}
          </div>
        </div>
      );
    }
    const res = `${this.props.listing.description.substring(0, 50)}...`;
    return (
      <div className="smallview-outer">
        {this.props.listing.address}.
        <div className="smallView">
          <p className="name"> Posted by: { this.props.listing.author.firstName }</p>
          <p className="desc"> Description: { res } </p>
          {this.renderAdditionalInfo()}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ListingSmallView);
