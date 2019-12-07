import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Paper from "./components/Paper/Paper";
import Settings from "./components/Settings/Settings"
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div className="router">
      <Link to="/" className="router-link">Papers</Link>
      <Link to="/" className="router-link">Your Papers</Link>
      <Link to="/" className="router-link router-link-last">Your Reviews</Link>
      <Link to="/settings" className="router-link router-link-settings">Settings</Link>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/paper" component={Paper} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
