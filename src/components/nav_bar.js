import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// ideally will turn this into a drop-down type menu
const NavBar = (props) => {
  return (
    <div id="nav_bar">
      <NavLink exact to="/"> Main Page </NavLink>
      <NavLink to="/listings/new"> Add a listing. </NavLink>
    </div>
  );
};

export default connect(null, { })(NavBar);
