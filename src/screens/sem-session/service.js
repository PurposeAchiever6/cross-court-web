import axios from 'axios';
import { getHeaders } from 'shared/utils/auth';
import { format } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getSessionInfo: async (id, date) => {
    const response = await axios.get(`${API_URL}/sem/sessions/${id}`, {
      headers: getHeaders(),
      data: {},
      params: {
        date: format(new Date(date), 'dd/MM/yyyy'),
      },
    });

    return response.data;
  },

  checkIn: async ids => {
    await axios.put(
      `${API_URL}/sem/user_sessions/check_in`,
      {
        ids,
      },
      {
        headers: getHeaders(),
      }
    );
  },
};