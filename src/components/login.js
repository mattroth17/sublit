import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="login-page">
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </div>
  );
};

export default connect(null, { })(Login);
