import axios from 'axios';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getPurchaseHistory: async () => {
    const response = await axios.get(`${API_URL}/purchases`, {
      headers: getHeaders(),
      data: {},
    });
    console.log(response.data);
    return response.data.purchases;
  },
};
