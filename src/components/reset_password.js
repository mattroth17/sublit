// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { resetPassword } from '../actions/index';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatch: true,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onConfrimPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  onSubmit = (event) => {
    if (this.state.password === '' || this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordsMatch: false,
      });
    } else {
      this.props.resetPassword({ email: this.state.email, password: this.state.password, token: this.props.match.params.passwordtoken }, this.props.history);
    }
  }

  render() {
    return (
      <div className="user-creator">
        <div>
          <div className="email">
            <h2>Email:</h2>
            <input className="email-input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
          </div>
          <div className="pass">
            <h2>New Password:</h2>
            <input type="password" className="password-input" placeholder="New Password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
          <div className="pass">
            <h2>Confirm Password:</h2>
            <input type="password" className="password-input" placeholder="Confirm Password" onChange={this.onConfrimPasswordChange} value={this.state.confirmPassword} />
          </div>
          <div className="iconsBox">
            <ul className="icon-list">
              <li>
                <button type="button" onClick={this.onSubmit}>Submit</button>
              </li>
            </ul>
          </div>
          <p style={{ display: this.state.passwordsMatch ? 'none' : 'flex' }}>Passwords must match</p>
        </div>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { resetPassword })(ResetPassword);
