import api from 'shared/services';

export default {
  getAllPaymentMethods: async () => {
    const response = await api.get(`/payment_methods`, {
      data: {},
    });

    return response.data.paymentMethods;
  },
  createPaymentMethod: async (stripe, cardElement) => {
    const response = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (response.error) {
      throw new Error(response.error.message);
    } else {
      return response.paymentMethod.id;
    }
  },
  addPaymentMethod: async (paymentMethodStripeId) => {
    const response = await api.post(`/payment_methods`, {
      paymentMethodStripeId,
    });

    return response.data;
  },
  deletePaymentMethod: async (paymentMethodId) => {
    const response = await api.delete(`/payment_methods/${paymentMethodId}`, {
      data: {},
    });

    return response.data.paymentMethods;
  },
  updatePaymentMethod: async (paymentMethodId, paymentMethodAttrs) => {
    const response = await api.put(`/payment_methods/${paymentMethodId}`, {
      paymentMethod: paymentMethodAttrs,
    });

    return response.data.paymentMethods;
  },
};
