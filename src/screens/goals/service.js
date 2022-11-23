import api from 'shared/services';

export default {
  getGoals: async () => {
    const response = await api.get(`/goals`, {
      data: {},
    });

    return response.data.goals;
  },
};
