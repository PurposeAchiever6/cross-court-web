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
  editUserProfile: async (userData) => {
    const response = await api.put(`/user`, {
      user: userData,
    });
    return response.data.user;
  },
  sendMembershipHandbook: async (email) => {
    const response = await api.post(`user/send_membership_handbook`, {
      email,
    });
    return response.data;
  },
};
