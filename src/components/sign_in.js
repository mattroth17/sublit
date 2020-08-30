// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { signinUser, sendResetEmail } from '../actions/index';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      forgot: false,
      sent: false,
      invalid: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    this.props.signinUser({ email: this.state.email, password: this.state.password }, this.props.history);
  }

  onCancel = (event) => {
    this.props.history.push('/');
  }

  forgotPasswordClicked = (event) => {
    this.setState({
      email: '',
      forgot: true,
    });
  }

  return = (event) => {
    this.setState({
      email: '',
      forgot: false,
    });
  }

  sendReset = (event) => {
    if (this.state.email === '') {
      this.setState({
        invalid: true,
      });
    } else {
      this.setState({
        sent: true,
        invalid: false,
      });
      this.props.sendResetEmail({ email: this.state.email }, this.props.history);
    }
  }

  render() {
    return (
      <div className="user-creator">
        <div className="auth_cont">
          <div className="auth_background">
            <div style={{ display: this.state.forgot ? 'none' : 'block' }}>
              <h1 className="signInHeader">Sign in to Your Account</h1>
              <div className="auth_form">
                <div>
                  <input className="auth_input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
                </div>
                <div>
                  <input className="auth_input" type="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
                </div>
              </div>
              <div className="iconsBox">
                <div className="icon-list">
                  <li onClick={this.forgotPasswordClicked}>
                    <p>Forgot Password</p>
                  </li>
                  <li key="return" onClick={this.onSubmit}>
                    <button className="auth_button" type="button">SIGN IN</button>
                  </li>
                  <li key="save" onClick={this.onCancel}>
                    <i className="fas fa-window-close" />
                  </li>
                </div>
              </div>
            </div>
            <div className="forgotPassword" style={{ display: this.state.forgot ? 'flex' : 'none' }}>
              <h1 className="signInHeader">Forgot Password</h1>
              <p>Enter email and check inbox for reset password instructions.</p>
              <input className="auth_input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
              <button className="auth_button" type="button" onClick={this.sendReset}>Send</button>
              <button className="back_button" type="button" onClick={this.return}><i className="fas fa-arrow-left" /> </button>
              <p style={{ display: this.state.sent ? 'flex' : 'none' }} className="sent">Reset password instructions sent.</p>
              <p style={{ display: this.state.invalid ? 'flex' : 'none' }} className="sent">Enter valid email address.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { signinUser, sendResetEmail })(SignIn);
