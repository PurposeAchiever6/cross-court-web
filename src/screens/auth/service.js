import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  login: credentials =>
    axios
      .post(`${API_URL}/users/sign_in`, {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      })
      .then(response => {
        const { client, uid } = response.headers;
        const accessToken = response.headers['access-token'];

        return { client, uid, accessToken };
      }),
};
