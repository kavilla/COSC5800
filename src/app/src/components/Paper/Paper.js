import React from "react";
import "./Paper.css";
import PaperService from "./../../services/PaperService";

export default class Paper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paper: null,
      reviews: []
    }

    PaperService.getSelectedPaper()
      .then(resp => {
        this.setState(() => ({
          paper: resp
        }));
      });
  }

  render() {
    const paperCard = this.state.paper !== null ?
      <div className="paper-card">
        <h3 className="paper-card-header">#{ this.state.paper.paperid }</h3>
        <h1 className="paper-card-item">{ this.state.paper.title }</h1>
        <span className="paper-card-item">
          Contact: { this.state.paper.contactauthoremail }
        </span>
        <span className="paper-card-item">
          Overall Score: TODO
        </span>
        <span className="paper-card-item">
          Filename: { this.state.paper.filename }
        </span>
        <span className="paper-card-item">
          Abstract: { this.state.paper.abstract }
        </span>
      </div> : null;

    const reviewCards = this.state.reviews.map((review) => (
      <div className="review-card">
        Hello
      </div>
    ));

    return (
      <div className="paper">
        { paperCard }
        <div className="review-card-container ">
          { reviewCards }
        </div>
      </div>
    )
  }
}
