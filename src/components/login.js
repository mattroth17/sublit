import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="login-page">
      <div className="welcome">
        <h2> Welcome to Sublit! Please sign in or sign up to view/add listings. </h2>
      </div>
      <NavLink to="/signin" className="sign">Sign In</NavLink>
      <p> </p>
      <NavLink to="/signup" className="sign">Sign Up</NavLink>
    </div>
  );
};

export default connect(null, { })(Login);
