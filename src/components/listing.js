import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing } from '../actions';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // editing: 0,
      // title: '',
      // tags: '',
      // description: '',
      // coverUrl: '',
    };
  }

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.listingID);
  }

  render() {
    // need to add authorization for editing posts
    // if (this.state.editing === 1) {
    //   return <div> editing </div>;
    // }

    return (
      <div>
        <div id="title">
          <p>{this.props.currentPost.address}</p>
          <p>{this.props.currentPost.rent}</p>
          <p>{this.props.currentPost.renterName}</p>
          <button type="button" id="editb" onClick={() => this.stEdits()}> Edit me. </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  currentPost: reduxState.listings.current,
});

export default connect(mapStateToProps, { fetchListing })(Listing);
