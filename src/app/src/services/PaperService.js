import axios from 'axios';
import Config from './../config';
import PaperModel from './../models/Paper';
import ReviewModel from './../models/Review';

const paperUrl = Config.BASE_URL + 'papers/';

let papers = [];
let selectedPaper = null;

const PaperService = {
  getPapers: function () {
    return axios
      .get(paperUrl)
      .then(resp => {
        papers = resp.data.map(x =>
          new PaperModel(
            x['paperid'],
            x['title'],
            x['filename'],
            x['contactauthoremail'],
            x['abstract']
          )
        );
        return Promise.resolve(papers);
      });
  },

  getPapersForParticipator: function (participator) {
    return axios
      .get(paperUrl + participator.email)
      .then(resp => {
        const participatorPapers = resp.data.map(x =>
          new PaperModel(
            x['paperid'],
            x['title'],
            x['filename'],
            x['contactauthoremail'],
            x['abstract']
          )
        );
        return Promise.resolve(participatorPapers);
      })
      .catch(err => {
        return Promise.resolve([]);
      });
  },

  getSelectedPaper: function () {
    return Promise.resolve(selectedPaper);
  },

  setSelectedPaper: function (paper) {
    selectedPaper = paper;
    return Promise.resolve(selectedPaper);
  },

  getReviewsForPaper: function (paper) {
    if (paper === null) {
      return Promise.reject();
    }

    return axios
      .get(paperUrl + paper['paperid'] + '/reviews')
      .then(resp => {
        const reviews = resp.data.map(x =>
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
  }
}

export default PaperService;
