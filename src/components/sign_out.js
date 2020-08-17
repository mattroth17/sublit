import React, { Component } from 'react';
import '../style.scss';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/index';

class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  signOut = (event) => {
    this.props.signoutUser(this.props.history);
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div id="signout">
        <button onClick={this.signOut} type="button">Sign Out</button>
      </div>
    );
  }
}

export default connect(null, { signoutUser })(SignOut);
