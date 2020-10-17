import api from 'shared/services';

export default {
  getQuestions: async () => {
    const response = await api.get(`/session_surveys/questions`, {
      data: {},
    });

    return response.data;
  },
  saveAnswer: async () => {
    const response = await api.post(`/session_surveys/answers`, {
      paymentMethod: paymentMethodId,
    });
  },
};
