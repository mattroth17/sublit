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
        <div className="auth_cont">
          <div className="auth_background">
            <h1 className="signInHeader">Create New Password</h1>
            <div className="auth_form">
              <div>
                <input className="auth_input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
              </div>
              <div>
                <input type="password" className="auth_input" placeholder="New Password" onChange={this.onPasswordChange} value={this.state.password} />
              </div>
              <div>
                <input type="password" className="auth_input" placeholder="Confirm Password" onChange={this.onConfrimPasswordChange} value={this.state.confirmPassword} />
              </div>
              <button id="new_pass_submit" type="button" onClick={this.onSubmit}>Submit</button>
              <p style={{ display: this.state.passwordsMatch ? 'none' : 'flex' }}>Passwords must match</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { resetPassword })(ResetPassword);
