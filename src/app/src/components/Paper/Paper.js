import React from "react";
import "./Paper.css";
import "./../../App.css";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import PaperService from "./../../services/PaperService";
import AuthService from "./../../services/AuthService";

export default class Paper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      toHome: false,
      paper: null,
      reviews: [],
      isReviewer: false,
      showModal: false
    }

    AuthService.getCurrentParticipator()
      .then(currentParticipator => {
        if (currentParticipator.isReviewer) {
          this.setState(() => ({
            isReviewer: true
          }));
        }

        PaperService.getSelectedPaper()
          .then(paper => {
            if (paper === null) {
              this.setState(() => ({
                toHome: true
              }));
              return;
            }

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
      });
  }

  handleShowModal = () => {
    this.setState(() => ({
      showModal: true
    }));
  };

  handleHideModal = () => {
    this.setState(() => ({
      showModal: false
    }));
  };

  render() {
    if (this.state.toHome) {
      return <Redirect to="/home" />;
    }

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

    const addReviewButton = !this.state.isLoading && this.state.isReviewer ?
    <div
      className="add-review-button-container btn-primary"
      onClick={() => this.handleShowModal()}>
      <span>
        +
      </span>
    </div> : null;

    const addReviewModal = this.state.showModal ?
      <div className="app-modal-container">
        <div className="app-modal">
          <div className="app-modal-close-button-container">
            <Button
              className="app-modal-close-button btn-light"
              onClick={() => this.handleHideModal()}>
                X
            </Button>
          </div>
          <h3 className="app-modal-preheader">
            #{ this.state.paper.paperid }
          </h3>
          <h1>{ this.state.paper.title }</h1>
          <span className="app-modal-subheader">
            Contact: { this.state.paper.contactauthoremail }
          </span>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Tech Merit:</span>
              <input
                type="range"
                name="techmerit"
                min="1"
                max="10"/>
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Readability:</span>
              <input
                type="range"
                name="readability"
                min="1"
                max="10"/>
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Originality:</span>
              <input
                type="range"
                name="originality"
                min="1"
                max="10"/>
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Relavance:</span>
              <input
                type="range"
                name="relavance"
                min="1"
                max="10"/>
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Overall Score:</span>
              <input
                type="range"
                name="overallrecomm"
                min="1"
                max="10"/>
            </div>
          </div>
          <textarea
            maxlength="120"
            placeholder="Comment for committee..."
            className="app-modal-item">
          </textarea>
          <textarea
            maxlength="120"
            placeholder="Comment for author..."
            className="app-modal-item">
          </textarea>
          <Button>
            Submit
          </Button>
        </div>
      </div> : null;

    return (
      <div className="paper">
        { paperCard }
        <div>
          { reviewHeader }
        </div>
        <div className="review-card-container ">
          { reviewCards }
        </div>
        <div>
          { addReviewButton }
        </div>
        <div>
          { addReviewModal }
        </div>
      </div>
    )
  }
}
