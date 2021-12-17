import api from 'shared/services';

export default {
  createDeal: async (event, args = [], params = {}) => {
    const response = await api.post(`/active_campaign/deals`, {
      event,
      args,
      params,
    });

    return response.data;
  },

  createContact: async (userParams) => {
    const response = await api.post(`/active_campaign/contacts`, userParams);

    return response.data;
  },
};
