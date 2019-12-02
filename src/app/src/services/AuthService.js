import axios from 'axios';
import Config from './../config';

const authUrl = Config.BASE_URL + 'auth/';

const AuthService = {
  login: function (email, password) {
    axios
      .post(authUrl + 'login', {
        email: email,
        password: password
      })
      .then(resp => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        console.log(resp);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }
}

export default AuthService;
