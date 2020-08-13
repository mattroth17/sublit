import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { createListing } from '../actions/index';

class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // date: '',
      address: '',
      // rent: 0,
      // lenSublet: '',
      // numberOfRooms: 0,
      // isFullApartment: false,
      // pictures: [],
      // numParkingSpaces: 0,
      // numBaths: 0,
      // description: '',
      renterName: '',
      // ammenities: [],
    };
  }

  // for now just testing with address and renter name
  onChange = (event) => {
    this.setState({ address: event.target.value.address, renterName: event.target.value.renterName });
  }

  makePost = () => {
    const post = {
      address: this.state.address,
      renterName: this.state.renterName,
    };

    this.props.createPost(post, this.props.history);

    return post;
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange}
          placeholder="Please enter the details of your listing following this JSON format:
        {
          date: String,
          address: String,
          rent: Integer,
          numberOfRooms: Integer,
          isFullApartment: Boolean,
          pictures: Array[String],
          numParkingSpaces: Integer,
          description: String,
          renterName: String,
          ammenities: Array,
        }"
        />
        <button type="button" onClick={() => this.makePost()}> Post your listing. </button>
      </div>
    );
  }
}

export default withRouter(connect(null, {})(NewListing));
