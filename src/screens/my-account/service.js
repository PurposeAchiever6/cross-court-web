import api from 'shared/services';

export default {
  getUserSessions: async () => {
    const response = await api.get(`/user_sessions`, {
      data: {},
    });
    return response.data;
  },
  getUserProfile: async () => {
    const response = await api.get(`/user`, {
      data: {},
    });
    return response.data.user;
  },
  editUserProfile: async ({ name, phoneNumber }) => {
    const response = await api.put(`/user`, {
      user: {
        name,
        phoneNumber,
      },
    });
    return response.data.user;
  },
};
