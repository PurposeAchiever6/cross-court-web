import api from 'shared/services';
import { requestFormattedDate } from 'shared/utils/date';

export default {
  getSessionInfo: async (id, date) => {
    const response = await api.get(`/sem/sessions/${id}`, {
      data: {},
      params: {
        date: requestFormattedDate(date),
      },
    });

    return response.data;
  },

  checkIn: async ids => {
    await api.put(`/sem/user_sessions/check_in`, {
      ids,
    });
  },
};
