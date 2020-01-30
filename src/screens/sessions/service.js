import api from 'shared/services';
import { format } from 'date-fns';

export default {
  getSessionInfo: async (sessionId, date) => {
    const response = await api.get(`/sessions/${sessionId}`, {
      data: {},
      params: {
        date: format(new Date(`${date}T00:00`), 'dd/MM/yyyy'),
      },
    });

    return response.data.session;
  },
  reserveSession: async (sessionId, date) => {
    const response = await api.post(`/sessions/${sessionId}/user_sessions`, {
      date: format(new Date(`${date}T00:00`), 'dd-LL-yyyy'),
    });

    return response.data.session;
  },
  cancelSession: async sessionId => {
    const response = await api.put(`/user_sessions/${sessionId}/cancel`, {});

    return response.data.session;
  },
  confirmSession: async sessionId => {
    const response = await api.put(`/user_sessions/${sessionId}/confirm`, {});

    return response.data;
  },
};
