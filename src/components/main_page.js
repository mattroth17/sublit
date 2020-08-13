import { React, Component } from 'react';
import { connect } from 'react-redux';
// import { fetchListings } from '../actions/index';

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
          <div className="listpreview">
            <NavLink to={`listings/${listing.id}`} className="lt"> {listing.title} </NavLink>
            {listing.description}
            <img src={listing.pictures} alt="" />
          </div>
        );
      })
    );
  }
};

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default connect(mapStateToProps, { })(Main);
