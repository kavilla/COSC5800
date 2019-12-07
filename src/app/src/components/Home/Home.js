import React from "react";
import "./Home.css";
import PaperService from "./../../services/PaperService";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.papers = [];
    PaperService.get()
      .then(resp => {
        this.papers = resp;
      });
  }

  render() {
    const paperCards = this.papers.map((paper) => (
      <div className="card" key={ paper.paperid }>
        <div className="card-top">
          <h3>#{ paper.paperid }</h3>
        </div>
        <div className="card-middle">
          <h1>{ paper.title }</h1>
        </div>
        <div className="card-bottom">
          <span className="card-bottom-item-small">Contact: { paper.contactauthoremail }</span>
          <span className="card-bottom-item-large">Abstract: { paper.abstract }</span>
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
