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

  onCancel = (event) => {
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div className="user-creator">
        <div className="auth_cont">
          <div className="auth_background">
            <h1 className="signInHeader">Confirm Email</h1>
            <div>
              <p>A link has been sent to your email. Please click the link in your email to confirm your account.</p>
              <p> </p>
              <p>If you did not recieve an email, enter your email and click to resend the link.</p>
              <p> </p>
              <div className="auth_form">
                <input className="auth_input" placeholder="enter email" onChange={this.onEmailChange} value={this.state.email} />
              </div>
              <div className="auth_buttons">
                <button key="return" onClick={this.resend} className="auth_button" type="button">RESEND LINK</button>
                <p key="save" onClick={this.onCancel}><i className="fas fa-window-close" /></p>
                <p id="message" style={{ display: this.state.showMessage ? 'flex' : 'none' }}>Email Sent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { resendConfirmation })(ConfirmEmail);
