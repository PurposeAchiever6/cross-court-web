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
  editUserProfile: async ({ firstName, lastName, phoneNumber }) => {
    const response = await api.put(`/user`, {
      user: {
        firstName,
        lastName,
        phoneNumber,
      },
    });
    return response.data.user;
  },
};
