import { React, Component } from 'react';
import { connect } from 'react-redux';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: 0,
      title: '',
      tags: '',
      description: '',
      coverUrl: '',
    };
  }

  render() {
    // need to add authorization for editing posts
    if (this.state.editing === 1) {
      return <div> editing </div> 
    }

    return (
      <div className="listing"> 
        <div id="title">
          {this.props.currentPost.address}
          {this.props.currentPost.rent}
          {this.props.currentPost.renterName}
          <button type="button" id="editb" onClick={() => this.stEdits()}> Edit me. </button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

export default connect(mapStateToProps, { })(Listing);
