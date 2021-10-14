import api from 'shared/services';

export default {
  getUserSessionList: async (sessionId) => {
    const response = await api.get(`/sessions/${sessionId}/user_sessions`, {
      data: {},
      params: {},
    });

    return response.data.userSessions;
  },
};
