import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="login-page">
      <div className="login-btn">
        <NavLink to="/signin" className="navlink">Sign In</NavLink>
      </div>
      <div className="login-btn">
        <NavLink to="/signup" className="navlink">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default connect(null, { })(Login);
