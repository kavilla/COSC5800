import axios from 'axios';
import Config from './../config';
import ParticipatorModel from './../models/Participator';

const authUrl = Config.BASE_URL + 'auth/';

let currentParticipator = null;

const AuthService = {
  getToken: function () {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email === null || password === null) {
      return Promise.reject();
    }

    return Promise.resolve({
      email: email,
      password: password
    })
  },

  authorizedView: function () {
    document.getElementById('router-menu').style.display = 'flex';;
    return Promise.resolve(true);
  },

  unauthorizedView: function () {
    document.getElementById('router-menu').style.display = 'none';;
    return Promise.resolve(true);
  },

  login: function (email, password) {
    return axios
      .post(authUrl + 'login', {
        email: email,
        password: password
      })
      .then(resp => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        return Promise.resolve(true);
      })
      .catch(err => {
        return Promise.resolve(false);
      });
  },

  logout: function () {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    return Promise.resolve(true);
  },

  signup: function (participator) {
    return axios
      .post(authUrl + 'signup', {
        email: participator.email,
        password: participator.password,
        firstname: participator.firstname,
        minit: participator.minit,
        lastname: participator.lastname,
        phone: participator.phone,
        affiliation: participator.affiliation,
        isAuthor: participator.isAuthor,
        isReviewer: participator.isReviewer
      })
      .then(resp => {
        const data = resp['data'];
        currentParticipator = new ParticipatorModel(
          data['email'],
          data['password'],
          data['firstname'],
          data['minit'],
          data['lastname'],
          data['phone'],
          data['affiliation'],
          data['isAuthor'],
          data['isReviewer']
        );
        localStorage.setItem('email', currentParticipator.email);
        localStorage.setItem('password', currentParticipator.password);
        return Promise.resolve(true);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

export default AuthService;
