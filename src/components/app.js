import '../style.scss';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import React from 'react';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;