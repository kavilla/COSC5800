import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./SignUp.css";
import AuthService from "./../../services/AuthService";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
  };

  componentDidMount() {
    AuthService.unauthorizedView();
  }

  componentWillUnmount() {
    AuthService.authorizedView();
  }

  render() {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
        <div className="signup-container">
          <div className="signup-item">
            <form onSubmit={this.handleSubmit}>
              <div className="signup-item-name">
                <FormGroup
                  autoFocus
                  className="signup-item-name-item-large"
                  controlId="firstname">
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    type="text"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup
                  className="signup-item-name-item-small"
                  controlId="middle-init">
                  <FormLabel>MI</FormLabel>
                  <FormControl
                    value={this.state.mi}
                    onChange={this.handleChange}
                    type="text"
                  />
                </FormGroup>
                <FormGroup
                  className="signup-item-name-item-large"
                  controlId="lastname">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    type="text"
                  />
                </FormGroup>
              </div>
              <FormGroup controlId="phone">
                <FormLabel>Phone</FormLabel>
                <FormControl
                  value={this.state.phone}
                  onChange={this.handleChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup controlId="affiliation">
                <FormLabel>Affiliation</FormLabel>
                <FormControl
                  value={this.state.affiliation}
                  onChange={this.handleChange}
                  type="text"
                />
              </FormGroup>
              <h3>
                Role(s)
              </h3>
              <span className="signup-item-sublabel">
                Select one or many
              </span>
              <FormGroup
                controlId="author"
                className="signup-checkbox-container">
                <FormControl
                  value={this.state.isAuthor}
                  onChange={this.handleChange}
                  type="checkbox"
                  className="signup-checkbox"
                />
                <FormLabel className="signup-checkbox-label">
                  Author
                </FormLabel>
              </FormGroup>
              <FormGroup
                controlId="reviewer"
                className="signup-checkbox-container">
                <FormControl
                  value={this.state.isReviewer}
                  onChange={this.handleChange}
                  type="checkbox"
                  className="signup-checkbox"
                />
                <FormLabel className="signup-checkbox-label">
                  Review
                </FormLabel>
              </FormGroup>
            </form>
          </div>
          <div className="signup-item">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
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
              <FormGroup controlId="confirm-password">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <div>
              <span>Already have an account?</span>
              <Link to="/">Login!</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
