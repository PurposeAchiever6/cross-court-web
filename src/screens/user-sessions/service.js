import api from 'shared/services';

export default {
  getUserSessionList: async (sessionId, params) => {
    const response = await api.get(`/sessions/${sessionId}/user_sessions`, {
      data: {},
      params,
    });

    return response.data;
  },
};
