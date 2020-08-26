// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { resendConfirmation } from '../actions/index';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showMessage: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  resend = (event) => {
    this.setState({ showMessage: true });
    this.props.resendConfirmation({
      email: this.state.email,
    });
  }

  render() {
    return (
      <div className="confirm">
        <p>A link has been sent to your email. Please click the link in your email to confirm your account.</p>
        <p>If you did not recieve an email, enter your email and click to resend the link.</p>
        <p> </p>
        <input placeholder="enter email" onChange={this.onEmailChange} value={this.state.email} />
        <button type="button" onClick={this.resend}>Resend Link</button>
        <p id="message" style={{ display: this.state.showMessage ? 'flex' : 'none' }}>Email Sent.</p>
      </div>
    );
  }
}

export default connect(null, { resendConfirmation })(ConfirmEmail);
