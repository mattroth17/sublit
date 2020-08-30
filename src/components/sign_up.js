// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { signupUser } from '../actions/index';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  onFirstNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    this.props.signupUser({ email: this.state.email, password: this.state.password, firstName: this.state.name }, this.props.history);
  }

  onCancel = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="user-creator">
        <div className="auth_cont">
          <div className="auth_background">
            <h1 className="signInHeader">Welcome to Sublit!</h1>
            <p> Fill out the following information to sign up.</p>
            <div className="auth_form">
              <div>
                <input className="auth_input" placeholder="First Name" onChange={this.onFirstNameChange} value={this.state.name} />
              </div>
              <div>
                <input className="auth_input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
              </div>
              <div>
                <input type="password" className="auth_input" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
              </div>
            </div>
            <div className="iconsBox">
              <ul className="icon-list">
                <li key="signup" onClick={this.onSubmit}>
                  <button type="button" className="auth_button" id="width">Sign Up</button>
                </li>
                <li key="cancel" onClick={this.onCancel}>
                  <i className="fas fa-window-close" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { signupUser })(SignUp);
