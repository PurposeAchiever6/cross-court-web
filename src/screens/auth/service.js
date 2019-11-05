import axios from 'axios';

export default {
  login: credentials =>
    axios
      .post(`https://cross-court-internal.herokuapp.com/api/v1/users/sign_in`, {
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
