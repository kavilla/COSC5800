import axios from 'axios';
import Config from './../config';
import ParticipatorModel from './../models/Participator';

const authUrl = Config.BASE_URL + 'auth/';

let currentParticipator = null;

function authorizeUser(data) {
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
  if (currentParticipator.password !== null) {
    localStorage.setItem('password', currentParticipator.password);
  }
}

const AuthService = {
  getToken: function () {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email === null) {
      return Promise.reject();
    }

    return Promise.resolve({
      email: email,
      password: password
    })
  },

  getCurrentParticipator: function () {
    if (currentParticipator === null) {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      if (email === null) {
        return Promise.reject();
      }

      return this.login(email, password)
        .then(authorized => {
          if (!authorized) {
            return Promise.reject();
          }
          return Promise.resolve(currentParticipator);
        }
      );
    }

    return Promise.resolve(currentParticipator)
  },

  authorizedView: function () {
    document.getElementById('router-menu').style.display = 'flex';
    if (currentParticipator !== null) {
      if (!currentParticipator.isAuthor) {
        document.getElementById('router-menu-yourpapers').style.display = 'none';
      }

      if (!currentParticipator.isReviewer) {
        document.getElementById('router-menu-yourreviews').style.display = 'none';
      }
    }
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
        const data = resp['data'];
        authorizeUser(data);
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
        authorizeUser(data);
        return Promise.resolve(true);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

export default AuthService;
