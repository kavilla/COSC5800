import axios from 'axios';
import Config from './../config';
import PaperModel from './../models/Paper';

const paperUrl = Config.BASE_URL + 'papers';

let papers = [];

const PaperService = {
  get: function () {
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
        console.log(papers);
        return Promise.resolve(papers);
      });
  }
}

export default PaperService;
