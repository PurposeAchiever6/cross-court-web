import ROUTES from 'shared/constants/routes';
import api from 'shared/services';

const APP_URL = import.meta.env.VITE_URL;

export default {
  login: async (credentials) => {
    const response = await api.post(`/users/sign_in`, {
      user: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    const { client, uid } = response.headers;
    const accessToken = response.headers['access-token'];

    return { client, uid, accessToken };
  },
  signup: async (credentials) => {
    const response = await api.post(`/users`, {
      user: {
        ...credentials,
      },
    });

    return response.data.user;
  },
  sendConfirmationEmail: async (email) => {
    const response = await api.post(`/user/resend_confirmation_instructions`, {
      email,
    });

    return response.data;
  },
  updatePersonalInfo: async ({ email, personalInfo }) => {
    const response = await api.put(`/user/update_personal_info`, {
      email,
      personalInfo,
    });

    return response.data;
  },
  forgotPassword: async ({ email }) => {
    const response = await api.post(`/users/password`, {
      email,
      redirect_url: `${APP_URL}${ROUTES.LOGIN}`,
    });

    return response.data;
  },
  resetPassword: async ({ password, passwordConfirmation }) => {
    const response = await api.put('/users/password', {
      password,
      passwordConfirmation,
    });

    return response.data;
  },
  updateProfileRequest: async (payload) => {
    const response = await api.post(`/user/request_update`, payload);

    return response.data;
  },
};
