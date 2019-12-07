import React from "react";
import "./Paper.css";
import PaperService from "./../../services/PaperService";

export default class Paper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paper: null
    }

    PaperService.getSelectedPaper()
      .then(resp => {
        this.setState(() => ({
          paper: resp
        }));
      });
  }

  // handleCardClick = (paper) => {
  //   console.log(paper)
  // };

  render() {
    let paperCard = null;
    if (this.state.paper !== null) {
      paperCard =
        <div className="card">
          <div className="card-top">
            <h3>#{ this.state.paper.paperid }</h3>
          </div>
          <div className="card-middle">
            <h1>{ this.state.paper.title }</h1>
          </div>
          <div className="card-bottom">
            <span className="card-bottom-item-small">
              Contact: { this.state.paper.contactauthoremail }
            </span>
            <span className="card-bottom-item-large">
              Abstract: { this.state.paper.abstract }
            </span>
          </div>
        </div>
    }

    return (
      <div className="home">
        <div className="card-container">
          { paperCard }
        </div>
      </div>
    )
  }
}
