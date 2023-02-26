import api from 'shared/services';

export default {
  create: async (payload) => {
    await api.post('/surveys/sessions', payload);
  },
};
