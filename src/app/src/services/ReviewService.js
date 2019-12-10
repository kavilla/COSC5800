import axios from 'axios';
import Config from './../config';
import ReviewModel from './../models/Review';

const reviewUrl = Config.BASE_URL + 'reviews/';

let reviews = [];

const ReviewService = {
  getReviews: function () {
    return axios
      .get(reviewUrl)
      .then(resp => {
        reviews = resp.data.map(x =>
          new ReviewModel(
            x['revemail'],
            x['paperid'],
            x['techmerit'],
            x['readability'],
            x['originality'],
            x['relavance'],
            x['overallrecomm'],
            x['commentforcommittee'],
            x['commentforauthor']
          )
        );
        return Promise.resolve(reviews);
      });
  },

  getReviewsForParticipator: function (participator) {
    return axios
      .get(reviewUrl + participator.email)
      .then(resp => {
        const participatorReviews = resp.data.map(x =>
          new ReviewModel(
            x['revemail'],
            x['paperid'],
            x['techmerit'],
            x['readability'],
            x['originality'],
            x['relavance'],
            x['overallrecomm'],
            x['commentforcommittee'],
            x['commentforauthor']
          )
        );
        return Promise.resolve(participatorReviews);
      })
      .catch(err => {
        return Promise.resolve([]);
      });
  },

  createReview: function (review) {
    return axios
      .post(reviewUrl, review)
      .then(resp => {
        const participatorReviews = resp.data.map(x =>
          new ReviewModel(
            x['revemail'],
            x['paperid'],
            x['techmerit'],
            x['readability'],
            x['originality'],
            x['relavance'],
            x['overallrecomm'],
            x['commentforcommittee'],
            x['commentforauthor']
          )
        );
        return Promise.resolve(participatorReviews);
      })
      .catch(err => {
        if (err === null && err.data === null) {
          return Promise.reject(err);
        }

        return Promise.reject(err.response.data.status);
      });
  }
}

export default ReviewService;
