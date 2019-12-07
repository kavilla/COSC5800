import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Redirect, Link} from "react-router-dom";
import "./Login.css";
import AuthService from "./../../services/AuthService";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      toHome: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    AuthService.login(this.state.email, this.state.password)
      .then(resp => {
        if (resp) {
          this.setState(() => ({
            toHome: true
          }));
        } else {
          alert("Invalid email and/or password");
        }
      });
  };

  render() {
    if (this.state.toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <div>
          <span>Don't have an account?</span>
          <Link to="/signup">Sign Up!</Link>
        </div>
      </div>
    );
  }
}
