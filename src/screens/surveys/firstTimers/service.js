import api from 'shared/services';

export default {
  createOrUpdate: async (payload) => {
    await api.post('/surveys/first_timers', payload);
  },
};
