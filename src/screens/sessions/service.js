import axios from 'axios';
import { getHeaders } from 'shared/utils/auth';
import { format } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getSessionInfo: async (sessionId, date) => {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}`, {
      headers: getHeaders(),
      data: {},
      params: {
        date: format(new Date(`${date}T00:00`), 'dd/MM/yyyy'),
      },
    });

    return response.data.session;
  },
  reserveSession: async (sessionId, date) => {
    const response = await axios.post(
      `${API_URL}/sessions/${sessionId}/user_sessions`,
      {
        date: format(new Date(`${date}T00:00`), 'dd-LL-yyyy'),
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data.session;
  },
  cancelSession: async sessionId => {
    const response = await axios.put(
      `${API_URL}/user_sessions/${sessionId}/cancel`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return response.data.session;
  },
  confirmSession: async sessionId => {
    const response = await axios.put(
      `${API_URL}/user_sessions/${sessionId}/confirm`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  },
};
