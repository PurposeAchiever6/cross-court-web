import axios from 'axios';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getAllPaymentMethods: async () => {
    const response = await axios.get(`${API_URL}/payment_methods`, {
      headers: getHeaders(),
      data: {},
    });

    console.log(response.data);
    return response.data.payment_methods;
  },
  createPaymentMethod: async (stripe, cardElement) => {
    const response = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    console.log(response);
    return response.paymentMethod.id;
  },
  addPaymentMethod: async paymentMethodId => {
    const response = await axios.post(
      `${API_URL}/payment_methods`,
      {
        payment_method: paymentMethodId,
      },
      {
        headers: getHeaders(),
      }
    );

    console.log(response.data);
    return response.data;
  },
  deletePaymentMethod: async paymentMethodId => {
    const response = await axios.delete(`${API_URL}/payment_methods/${paymentMethodId}`, {
      headers: getHeaders(),
      data: {},
    });

    console.log(response.data);
    return response.data;
  },
};
