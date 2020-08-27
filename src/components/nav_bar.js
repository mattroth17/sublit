import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser } from '../actions/index';
import './css_files/nav_bar.scss';

// ideally will turn this into a drop-down type menu
class NavBar extends Component {
  signOut = (event) => {
    this.props.signoutUser(this.props.history);
    this.props.history.push('/signin');
  };

  render() {
    return (
      <div id="nav_bar">
        <NavLink exact to="/"> Main Page </NavLink>
        <NavLink to="/listings/new"> Add a listing </NavLink>
        <NavLink to="/chat"> Messages </NavLink>
        <button onClick={this.signOut} type="button">Sign Out</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signoutUser })(NavBar));
