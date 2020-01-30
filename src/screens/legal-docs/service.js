import api from 'shared/services';

export default {
  getTermsAndCondtions: async () => {
    const response = await api.get(`/legals/terms_and_conditions`, {
      data: {},
    });

    return response.data.text;
  },
  getCancelationPolicy: async () => {
    const response = await api.get(`/legals/cancelation_policy`, {
      data: {},
    });

    return response.data.text;
  },
};
