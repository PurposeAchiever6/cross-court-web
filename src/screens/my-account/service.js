import axios from 'axios';
import { camelizeKeys } from 'humps';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getUserSessions: async () => {
    const response = await axios.get(`${API_URL}/user_sessions`, {
      headers: getHeaders(),
      data: {},
    });
    return camelizeKeys(response.data);
  },
  getUserProfile: async () => {
    const response = await axios.get(`${API_URL}/user`, {
      headers: getHeaders(),
      data: {},
    });
    return camelizeKeys(response.data.user);
  },
  editUserProfile: async ({ name, phone_number }) => {
    const response = await axios.put(
      `${API_URL}/user`,
      {
        user: {
          name,
          phone_number,
        },
      },
      {
        headers: getHeaders(),
      }
    );
    return camelizeKeys(response.data.user);
  },
};
