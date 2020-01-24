import axios from 'axios';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  createPurchase: async (productId, cardId) => {
    const response = await axios.post(
      `${API_URL}/purchases`,
      {
        payment_method: cardId,
        product_id: productId,
      },
      {
        headers: getHeaders(),
      }
    );

    console.log(response.data);
    return response.data;
  },
  createFreeSession: async cardId => {
    const response = await axios.put(
      `${API_URL}/purchases/claim_free_session`,
      {
        payment_method: cardId,
      },
      {
        headers: getHeaders(),
      }
    );

    console.log(response.data);
    return response.data;
  },
};
