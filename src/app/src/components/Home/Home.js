import React from "react";
import {Redirect} from "react-router-dom";
import "./Home.css";
import PaperService from "./../../services/PaperService";
import AuthService from "./../../services/AuthService";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      papers: [],
      toSpecificPaper: false
    };

    AuthService.getCurrentParticipator()
      .then(currentParticipator => {
        PaperService.getPapers()
          .then(resp => {
            this.setState(() => ({
              papers: resp
            }));
          });
      });
  }

  handleCardClick = (paper) => {
    PaperService.setSelectedPaper(paper).then(() => {
      this.setState(() => ({
        toSpecificPaper: true
      }));
    });
  };

  render() {
    if (this.state.toSpecificPaper) {
      return <Redirect to="/paper" />;
    }

    const paperCards = this.state.papers.map((paper) => (
      <div className="card"
        key={ paper.paperid }
        onClick={() => this.handleCardClick(paper)}>
        <div className="card-top">
          <h3>#{ paper.paperid }</h3>
        </div>
        <div className="card-middle">
          <h1>{ paper.title }</h1>
        </div>
        <div className="card-bottom">
          <span className="card-bottom-item-small">
            Contact: { paper.contactauthoremail }
          </span>
          <span className="card-bottom-item-large">
            Abstract: { paper.abstract }
          </span>
        </div>
      </div>
    ));

    return (
      <div className="home">
        <div className="card-container">
          { paperCards }
        </div>
      </div>
    )
  }
}
