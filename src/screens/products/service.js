import api from 'shared/services';

export default {
  getAllProducts: async () => {
    const response = await api.get('/products', {
      data: {},
    });

    const freeSession = {
      name: 'Free Session',
      description: '1 session for free',
      price: '0',
    };

    return [...response.data.products, freeSession];
  },

  cancelSubscription: async (subscriptionId) => {
    const response = await api.delete(`/subscriptions/${subscriptionId}`, {
      data: {},
    });

    return response.data;
  },

  reactivateSubscription: async (subscriptionId) => {
    const response = await api.post(`/subscriptions/${subscriptionId}/reactivate`, {});

    return response.data;
  },

  removeSubscriptionCancelAtNextPeriodEnd: async (subscriptionId) => {
    const response = await api.post(
      `/subscriptions/${subscriptionId}/remove_cancel_at_next_period_end`,
      {}
    );

    return response.data;
  },

  updateSubscriptionPaymentMethod: async (subscriptionId, paymentMethodId) => {
    const response = await api.post(`/subscriptions/${subscriptionId}/payment_method`, {
      paymentMethodId,
    });

    return response.data;
  },

  createSubscriptionRequestCancellation: async (payload) => {
    const response = await api.post('/subscriptions/request_cancellation', payload);

    return response.data;
  },

  cancelSubscriptionRequestCancellation: async (payload) => {
    const response = await api.post('/subscriptions/cancel_request_cancellation', payload);

    return response.data;
  },

  pauseSubscription: async (subscriptionId, reason) => {
    const response = await api.put(`/subscriptions/${subscriptionId}/pause`, { reason });

    return response.data;
  },

  cancelPauseSubscription: async (subscriptionId) => {
    const response = await api.put(`/subscriptions/${subscriptionId}/cancel_pause`, {});

    return response.data;
  },

  unpauseSubscription: async (subscriptionId) => {
    const response = await api.put(`/subscriptions/${subscriptionId}/unpause`, {});

    return response.data;
  },
};
