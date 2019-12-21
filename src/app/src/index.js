import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Paper from './components/Paper/Paper';
import Settings from './components/Settings/Settings';
import YourPapers from './components/YourPapers/YourPapers';
import YourReviews from './components/YourReviews/YourReviews';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div className="router">
      <div className="router-menu" id="router-menu">
        <h5 className="router-menu-header">Conference App</h5>
        <NavLink to="/home" className="router-link" activeClassName="router-link-active">
          Papers
        </NavLink>
        <NavLink
          to="/yourpapers"
          className="router-link"
          activeClassName="router-link-active"
          id="router-menu-yourpapers"
        >
          Your Papers
        </NavLink>
        <NavLink
          to="/yourreviews"
          className="router-link router-link-last"
          activeClassName="router-link-active"
          id="router-menu-yourreviews"
        >
          Your Reviews
        </NavLink>
        <NavLink to="/settings" className="router-link router-link-settings">
          <img id="router-link-settings-icon" src="../../settings24.png" alt="Settings" />
        </NavLink>
      </div>
      <div className="router-view">
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/paper" component={Paper} />
        <Route path="/settings" component={Settings} />
        <Route path="/yourpapers" component={YourPapers} />
        <Route path="/yourreviews" component={YourReviews} />
      </div>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
