import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
  return (
    <div className="top-bar">
      <h1> <div id="sublit-title">Sublit</div>
        <div className="flex-btn">
          <div className="login-btn">
            <NavLink to="/signin" className="navlink">Sign In</NavLink>
          </div>
          <div className="login-btn">
            <NavLink to="/signup" className="navlink">Sign Up</NavLink>
          </div>
        </div>

      </h1>
      <div className="middle-section">
        <img src="https://usm-feed-nneren.s3.amazonaws.com/7224fa62ad0d0643d7c4b91da556a736-1-.jpg?1547834631"
          alt="house"
          id="house-one"
        />
      </div>
      <div className="middle-section">
        <div className="middle-oval" id="oval-one">
          <p>
            testing
          </p>
        </div>
        <div className="middle-oval" id="oval-two">
          <p>
            more testing
          </p>
        </div>
        <div className="middle-oval" id="oval-three">
          <p>
            more testing
          </p>
        </div>

      </div>
    </div>
  );
};

export default connect(null, { })(Login);
