import api from 'shared/services';

export default {
  getUserSessionList: async (sessionId, date) => {
    const response = await api.get(`/sessions/${sessionId}/user_sessions`, {
      data: {},
      params: { date },
    });

    return response.data.userSessions;
  },
};
