import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Home.css";
import AuthService from "./../../services/AuthService";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Home</code>
          </p>
        </header>
      </div>
    )
  }
}
