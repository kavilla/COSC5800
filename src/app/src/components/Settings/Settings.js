import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Redirect, Link} from "react-router-dom";
import "./Settings.css";
import AuthService from "./../../services/AuthService";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toLogin: false
    };
  }

  handleLogout = () => {
    AuthService.logout()
      .then(resp => {
        if (resp) {
          this.setState(() => ({
            toLogin: true
          }));
        }
      });
  };

  render() {
    if (this.state.toLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Settings">
        <div>
          <Button
            block
            onClick={() => this.handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
