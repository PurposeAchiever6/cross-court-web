import api from 'shared/services';
import { requestFormattedDate } from 'shared/utils/date';

export default {
  getSessionInfo: async (sessionId, date) => {
    const response = await api.get(`/sessions/${sessionId}`, {
      data: {},
      params: {
        date: requestFormattedDate(date),
      },
    });

    return response.data.session;
  },
  reserveSession: async (sessionId, date, referralCode) => {
    const response = await api.post(`/sessions/${sessionId}/user_sessions`, {
      date: requestFormattedDate(date),
      referralCode
    });

    if (referralCode) {
      window.sessionStorage.removeItem('referralCode');
    }

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
