// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { signInAndConfirmEmail } from '../actions/index';

class EmailConfirmed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    this.props.signInAndConfirmEmail({ email: this.state.email, password: this.state.password, confirmToken: this.props.match.params.token }, this.props.history);
  }

  render() {
    return (
      <div className="user-creator">
        <div className="auth_cont">
          <div className="auth_background">
            <h1 className="signInHeader">Sign in to Verify Account</h1>
            <div className="auth_form">
              <div>
                <input className="auth_input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
              </div>
              <div>
                <input className="auth_input" type="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
              </div>
            </div>
            <div className="auth_buttons">
              <button key="return" onClick={this.onSubmit} className="auth_button" type="button">SIGN IN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signInAndConfirmEmail })(EmailConfirmed);
