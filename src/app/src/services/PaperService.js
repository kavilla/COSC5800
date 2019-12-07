import axios from 'axios';
import Config from './../config';
import PaperModel from './../models/Paper';

const paperUrl = Config.BASE_URL + 'papers';

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

  getSelectedPaper: function () {
    return Promise.resolve(selectedPaper);
  },

  setSelectedPaper: function (paper) {
    selectedPaper = paper;
    return Promise.resolve(selectedPaper);
  }
}

export default PaperService;
