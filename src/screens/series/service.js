import axios from 'axios';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`, {
      headers: getHeaders(),
      data: {},
    });

    const freeSession = {
      name: 'Free Session',
      description: '1 session for free',
      price: '0',
    };

    return [...response.data.products, freeSession];
  },
};
