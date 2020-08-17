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
        <h1>Create an Account</h1>
        <h2>First Name</h2>
        <input className="name-input" placeholder="First Name" onChange={this.onFirstNameChange} value={this.state.name} />
        <h2>Email</h2>
        <input className="email-input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
        <h2>Password</h2>
        <input type="password" className="password-input" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        <ul className="icon-list">
          <li key="cancel" onClick={this.onCancel}>
            <i className="fas fa-window-close" />
          </li>
          <li key="signup" onClick={this.onSubmit}>
            <i className="fas fa-sign-in-alt" />
          </li>
        </ul>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { signupUser })(SignUp);
