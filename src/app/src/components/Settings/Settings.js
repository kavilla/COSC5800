import React from "react";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import "./Settings.css";
import AuthService from "./../../services/AuthService";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toLogin: false,
      participator: null
    };

    AuthService.getCurrentParticipator()
      .then(currentParticipator => {
        this.setState(() => ({
          participator: currentParticipator
        }));
      });
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

    const participatorCard = this.state.participator !== null ?
      <div className="card">
        <h3 className="card-header">Your Information</h3>
        <span className="card-item">
          Email: { this.state.participator.email }
        </span>
        <span className="card-item">
          First Name: { this.state.participator.firstname }
        </span>
        <span className="card-item">
          Middle Initial: { this.state.participator.minit }
        </span>
        <span className="card-item">
          Last Name: { this.state.participator.lastname }
        </span>
        <span className="card-item">
          Phone: { this.state.participator.phone }
        </span>
        <span className="card-item">
          Affiliation: { this.state.participator.affiliation }
        </span>
        <span className="card-item">
          Is Author?: { this.state.participator.isAuthor ? "True" : "False" }
        </span>
        <span className="card-item">
          Is Reviewer?: { this.state.participator.isReviewer ? "True" : "False" }
        </span>
      </div> : null;

    return (
      <div className="settings">
        <div className="card-container">
          { participatorCard }
        </div>
        <div className="button-container">
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
