import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Main from './main_page';
import NewListing from './new_listing';
import NavBar from './nav_bar';

// eventually include frontend for dropdown menu and chat
// need to discuss w/ team where to include

const App = (props) => {
  return (
    <Router>
      <div>
        <div className="title">
          <h1> Sublit </h1>
        </div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/listings/new" component={NewListing} />
          <Route path="/listings/:listingID" component={Listing} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, null)(App);