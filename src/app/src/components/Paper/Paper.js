import React from "react";
import "./Paper.css";
import PaperService from "./../../services/PaperService";

export default class Paper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      paper: null,
      reviews: []
    }

    PaperService.getSelectedPaper()
      .then(paper => {
        PaperService.getReviewsForPaper(paper).then(
          reviews => {
            this.setState(() => ({
              isLoading: false,
              paper: paper,
              reviews: reviews
            }));
          }
        );
      });
  }

  render() {
    const loadingSpinner = this.state.isLoading ?
      <div>
        Loading
      </div> : null;

    const paperCard = !this.state.isLoading && this.state.paper !== null ?
      <div className="paper-card">
        <h3 className="paper-card-header">#{ this.state.paper.paperid }</h3>
        <h1 className="paper-card-item">{ this.state.paper.title }</h1>
        <span className="paper-card-item">
          Contact: { this.state.paper.contactauthoremail }
        </span>
        <span className="paper-card-item">
          Average Overall Score: TODO
        </span>
        <span className="paper-card-item">
          Filename: { this.state.paper.filename }
        </span>
        <span className="paper-card-item">
          Abstract: { this.state.paper.abstract }
        </span>
      </div> : null;

    const reviewHeader = !this.state.isLoading ?
      <div className="review-card-container-title">
        <h4>Reviews</h4>
      </div> : null;

    const reviewCards = !this.state.isLoading && this.state.reviews.map((review) => (
      <div className="review-card"
        key={ review.revemail + "_" + review.paperid }>
        <div className="review-card-top">
          <h4>{ review.revemail }</h4>
        </div>
        <div className="review-card-middle">
          <h3>{ review.commentforcommittee }</h3>
        </div>
        <div className="review-card-bottom">
          <span className="review-card-bottom-item-large">
            Overall Recommendation: { review.overallrecomm }
          </span>
          <span className="review-card-bottom-item-small">
            Techmerit: { review.techmerit }
          </span>
          <span className="review-card-bottom-item-small">
            Readability: { review.readability }
          </span>
          <span className="review-card-bottom-item-small">
            Originality: { review.originality }
          </span>
          <span className="review-card-bottom-item-small">
            Relavance: { review.relavance }
          </span>
        </div>
      </div>
    ));

    return (
      <div className="paper">
        { paperCard }
        <div>
          { reviewHeader }
        </div>
        <div className="review-card-container ">
          { reviewCards }
        </div>
      </div>
    )
  }
}
