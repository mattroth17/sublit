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
        <div id="name">
          <h1 id="sublit">SubLit</h1>
        </div>
        <ul id="nav_buttons">
          <li>
            <NavLink exact to="/"> Listings </NavLink>
          </li>
          <li>
            <NavLink to="/listings/new"> New Listing </NavLink>
          </li>
          <li>
            <NavLink to="/chat"> Messages </NavLink>
          </li>
          <li>
            <button onClick={this.signOut} type="button">Sign Out</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(null, { signoutUser })(NavBar));
