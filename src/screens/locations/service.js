import axios from 'axios';
import { getHeaders } from 'shared/utils/auth';
import { format } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getLocations: async () => {
    const response = await axios.get(`${API_URL}/locations`, {
      headers: getHeaders(),
      data: {},
    });

    return response.data.locations;
  },
  getSessions: async (location_id = null, date) => {
    const response = await axios.get(`${API_URL}/sessions/`, {
      headers: getHeaders(),
      data: {},
      params: {
        from_date: format(new Date(date), 'dd/MM/yyyy'),
        location_id,
      },
    });

    return response.data.sessions;
  },
};
