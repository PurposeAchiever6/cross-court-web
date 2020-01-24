import axios from 'axios';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`, {
      headers: getHeaders(),
      data: {},
    });

    return response.data.products;
  },
};
