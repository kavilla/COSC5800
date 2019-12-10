import React from "react";
import {Redirect} from "react-router-dom";
import "./YourReviews.css";
import ReviewService from "./../../services/ReviewService";
import PaperService from "./../../services/PaperService";
import AuthService from "./../../services/AuthService";

export default class YourReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      toSpecificPaper: false
    };

    AuthService.getCurrentParticipator()
      .then(currentParticipator => {
        ReviewService.getReviewsForParticipator(currentParticipator)
          .then(resp => {
            this.setState(() => ({
              reviews: resp
            }));
          })
      });

  }

  handleCardClick = (review) => {
    PaperService.setSelectedPaperByPaperId(review.paperid).then(() => {
      this.setState(() => ({
        toSpecificPaper: true
      }));
    });
  };

  render() {
    if (this.state.toSpecificPaper) {
      return <Redirect to="/paper" />;
    }

    const reviewCards = this.state.reviews.map((review) => (
      <div className="card"
        key={ review.revemail + "_" + review.paperid }>
        <div className="card-top"
          onClick={() => this.handleCardClick(review)}>
          <h4>{ review.paperid }</h4>
        </div>
        <div className="card-middle">
          <h3>Comment for committee: { review.commentforcommittee }</h3>
          <h3>Comment for contact author: { review.commentforauthor }</h3>
        </div>
        <div className="card-bottom">
          <span className="card-bottom-item-large">
            Overall Recommendation: { review.overallrecomm }
          </span>
          <span className="card-bottom-item-small">
            Techmerit: { review.techmerit }
          </span>
          <span className="card-bottom-item-small">
            Readability: { review.readability }
          </span>
          <span className="card-bottom-item-small">
            Originality: { review.originality }
          </span>
          <span className="card-bottom-item-small">
            Relavance: { review.relavance }
          </span>
        </div>
      </div>
    ));

    return (
      <div className="your-reviews">
        <div className="card-container">
          { reviewCards }
        </div>
      </div>
    )
  }
}
