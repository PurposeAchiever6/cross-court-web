import axios from 'axios';
import routes from 'shared/constants/routes';
import { getHeaders } from 'shared/utils/auth';

const API_URL = process.env.REACT_APP_API_URL;
const APP_URL = process.env.REACT_APP_URL;

export default {
  login: async credentials => {
    const response = await axios.post(`${API_URL}/users/sign_in`, {
      user: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    const { client, uid } = response.headers;
    const accessToken = response.headers['access-token'];

    return { client, uid, accessToken };
  },
  signup: async credentials => {
    const response = await axios.post(`${API_URL}/users`, {
      user: {
        ...credentials,
      },
    });

    return response.data.user;
  },
  sendConfirmationEmail: async email => {
    const response = await axios.post(`${API_URL}/user/resend_confirmation_instructions`, {
      email,
    });

    return response.data;
  },
  forgotPassword: async ({ email }) => {
    const response = await axios.post(`${API_URL}/users/password`, {
      email,
      redirect_url: `${APP_URL}${routes.resetPassword}`,
    });

    return response.data;
  },
  resetPassword: async ({ password, passwordConfirm }) => {
    const response = await axios.put(
      `${API_URL}/users/password`,
      {
        password,
        password_confirmation: passwordConfirm,
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  },
};
