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
      password: null,
      confirmPassword: null,
      firstname: "",
      mi: "",
      lastname: "",
      phone: "",
      affiliation: "",
      isAuthor: false,
      isReviewer: false
    };
  }

  validateForm() {
    let isFormValid = true;

    isFormValid = isFormValid && this.state.email.length > 0 ;
    isFormValid = isFormValid && this.state.firstname.length > 0;
    isFormValid = isFormValid && this.state.lastname.length > 0;
    isFormValid = isFormValid && this.state.password === this.state.confirmPassword;
    isFormValid = isFormValid && (this.state.isAuthor || this.state.isReviewer);
    return isFormValid;
  }

  handleChange = event => {
    const targetId = event.target.id;
    if (targetId === 'isAuthor' || targetId === 'isReviewer') {
      this.setState({
        [targetId]: event.target.checked
      });
      return;
    }

    this.setState({
      [targetId]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log(this.state);
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
                    placeholder="Required"
                  />
                </FormGroup>
                <FormGroup
                  className="signup-item-name-item-small"
                  controlId="minit">
                  <FormLabel>MI</FormLabel>
                  <FormControl
                    value={this.state.minit}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Optional"
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
                    placeholder="Required"
                  />
                </FormGroup>
              </div>
              <FormGroup controlId="phone">
                <FormLabel>Phone</FormLabel>
                <FormControl
                  value={this.state.phone}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Optional (Format: ##########)"
                />
              </FormGroup>
              <FormGroup controlId="affiliation">
                <FormLabel>Affiliation</FormLabel>
                <FormControl
                  value={this.state.affiliation}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Optional"
                />
              </FormGroup>
              <h3>
                Role(s)
              </h3>
              <span className="signup-item-sublabel">
                Select one or many
              </span>
              <FormGroup
                controlId="isAuthor"
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
                controlId="isReviewer"
                className="signup-checkbox-container">
                <FormControl
                  value={this.state.isReviewer}
                  onChange={this.handleChange}
                  type="checkbox"
                  className="signup-checkbox"
                />
                <FormLabel className="signup-checkbox-label">
                  Reviewer
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
                  placeholder="Required"
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Optional"
                />
              </FormGroup>
              <FormGroup controlId="confirm-password">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Optional"
                />
              </FormGroup>
              <Button
                block
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
