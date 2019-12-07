import axios from 'axios';
import Config from './../config';

const authUrl = Config.BASE_URL + 'auth/';

const AuthService = {
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
  }
}

export default AuthService;
