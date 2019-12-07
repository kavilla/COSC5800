import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Paper from "./components/Paper/Paper";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Papers</Link>
        </li>
        <li>
          <Link to="/">Your Papers</Link>
        </li>
        <li>
          <Link to="/">Your Reviews</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/paper" component={Paper} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
