import React from 'react';
import './Paper.css';
import './../../App.css';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PaperService from './../../services/PaperService';
import AuthService from './../../services/AuthService';
import ReviewService from './../../services/ReviewService';
import ReviewModel from './../../models/Review';

export default class Paper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      toHome: false,
      paper: null,
      reviews: [],
      showModal: false,
      review: {
        techmerit: 10,
        readability: 10,
        originality: 10,
        relavance: 10,
        overallrecomm: 10,
        commentforcommittee: null,
        commentforauthor: null,
      },
      currentParticipator: null,
    };

    AuthService.getCurrentParticipator().then(currentParticipator => {
      AuthService.authorizedView();

      this.setState(() => ({
        currentParticipator: currentParticipator,
      }));

      PaperService.getSelectedPaper().then(paper => {
        if (paper === null) {
          this.setState(() => ({
            toHome: true,
          }));
          return;
        }

        ReviewService.getReviewsForPaper(paper).then(reviews => {
          this.setState(() => ({
            isLoading: false,
            paper: paper,
            reviews: reviews,
          }));
        });
      });
    });
  }

  handleShowModal = () => {
    this.setState(() => ({
      showModal: true,
    }));
  };

  handleHideModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  handleChange = event => {
    const targetName = event.target.name;
    const targetValue =
      targetName === 'commentforcommittee' || targetName === 'commentforauthor'
        ? event.target.value
        : Number(event.target.value);
    this.setState({
      review: {
        ...this.state.review,
        [targetName]: targetValue,
      },
    });
  };

  handleSubmit = () => {
    ReviewService.createReview(
      new ReviewModel(
        this.state.currentParticipator.email,
        this.state.paper.paperid,
        this.state.review.techmerit,
        this.state.review.readability,
        this.state.review.originality,
        this.state.review.relavance,
        this.state.review.overallrecomm,
        this.state.review.commentforcommittee,
        this.state.review.commentforauthor,
      ),
    )
      .then(reviews => {
        this.setState(() => ({
          reviews: reviews,
          showModal: false,
          review: {
            techmerit: 10,
            readability: 10,
            originality: 10,
            relavance: 10,
            overallrecomm: 10,
            commentforcommittee: null,
            commentforauthor: null,
          },
        }));
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    if (this.state.toHome) {
      return <Redirect to="/home" />;
    }

    const paperCard =
      !this.state.isLoading && this.state.paper !== null ? (
        <div className="paper-card">
          <h3 className="paper-card-header">#{this.state.paper.paperid}</h3>
          <h1 className="paper-card-item">{this.state.paper.title}</h1>
          <span className="paper-card-item">Contact: {this.state.paper.contactauthoremail}</span>
          <span className="paper-card-item">Average Overall Score: TODO</span>
          <span className="paper-card-item">Filename: {this.state.paper.filename}</span>
          <span className="paper-card-item">Abstract: {this.state.paper.abstract}</span>
        </div>
      ) : null;

    const reviewHeader = !this.state.isLoading ? (
      <div className="review-card-container-title">
        <h4>Reviews</h4>
      </div>
    ) : null;

    const reviewCards =
      !this.state.isLoading &&
      this.state.reviews.map(review => (
        <div className="review-card" key={review.revemail + '_' + review.paperid}>
          <div className="review-card-top">
            <h4>{review.revemail}</h4>
          </div>
          <div className="review-card-middle">
            <h3>{review.commentforcommittee}</h3>
          </div>
          <div className="review-card-bottom">
            <span className="review-card-bottom-item-large">Overall Recommendation: {review.overallrecomm}</span>
            <span className="review-card-bottom-item-small">Techmerit: {review.techmerit}</span>
            <span className="review-card-bottom-item-small">Readability: {review.readability}</span>
            <span className="review-card-bottom-item-small">Originality: {review.originality}</span>
            <span className="review-card-bottom-item-small">Relavance: {review.relavance}</span>
          </div>
        </div>
      ));

    const addReviewButton =
      !this.state.isLoading && this.state.currentParticipator !== null && this.state.currentParticipator.isReviewer ? (
        <div className="add-button-container btn-primary" onClick={() => this.handleShowModal()}>
          <span>+</span>
        </div>
      ) : null;

    const addReviewModal = this.state.showModal ? (
      <div className="app-modal-container">
        <div className="app-modal">
          <div className="app-modal-close-button-container">
            <Button className="app-modal-close-button btn-light" onClick={() => this.handleHideModal()}>
              X
            </Button>
          </div>
          <h3 className="app-modal-preheader">#{this.state.paper.paperid}</h3>
          <h1>{this.state.paper.title}</h1>
          <span className="app-modal-subheader">Contact: {this.state.paper.contactauthoremail}</span>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Tech Merit:</span>
              <input type="range" name="techmerit" min="1" max="10" onChange={this.handleChange} />
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Readability:</span>
              <input type="range" name="readability" min="1" max="10" onChange={this.handleChange} />
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Originality:</span>
              <input type="range" name="originality" min="1" max="10" onChange={this.handleChange} />
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Relavance:</span>
              <input type="range" name="relavance" min="1" max="10" onChange={this.handleChange} />
            </div>
          </div>
          <div className="app-modal-item">
            <div className="app-slider">
              <span>Overall Score:</span>
              <input type="range" name="overallrecomm" min="1" max="10" onChange={this.handleChange} />
            </div>
          </div>
          <textarea
            maxLength="120"
            placeholder="Comment for committee..."
            className="app-modal-item form-control"
            name="commentforcommittee"
            onChange={this.handleChange}
          ></textarea>
          <textarea
            maxLength="120"
            placeholder="Comment for author..."
            className="app-modal-item form-control"
            name="commentforauthor"
            onChange={this.handleChange}
          ></textarea>
          <Button onClick={() => this.handleSubmit()}>Submit</Button>
        </div>
      </div>
    ) : null;

    return (
      <div className="paper">
        {paperCard}
        <div>{reviewHeader}</div>
        <div className="review-card-container ">{reviewCards}</div>
        <div>{addReviewButton}</div>
        <div>{addReviewModal}</div>
      </div>
    );
  }
}
