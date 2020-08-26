// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { signupUser } from '../actions/index';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="confirm">
        <p>A link has been sent to your email. Please click the link in your email to confirm or enter your email to resend the link.</p>
        <input placeholder="enter email" />
        <button type="button">Resend Link</button>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { signupUser })(ConfirmEmail);
