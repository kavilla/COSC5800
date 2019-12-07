import React from "react";
import "./Home.css";
import PaperService from "./../../services/PaperService";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      papers: []
    }

    PaperService.get()
      .then(resp => {
        this.setState(() => ({
          papers: resp
        }));
      });
  }

  handleCardClick = (paper) => {
    console.log(paper)
  };

  render() {
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
