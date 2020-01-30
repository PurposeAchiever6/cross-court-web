import api from 'shared/services';

import { format } from 'date-fns';

export default {
  getSessionInfo: async (id, date) => {
    const response = await api.get(`/sem/sessions/${id}`, {
      data: {},
      params: {
        date: format(new Date(date), 'dd/MM/yyyy'),
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
