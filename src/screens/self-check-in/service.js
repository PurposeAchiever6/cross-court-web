import api from 'shared/services';

export default {
  getQrData: async (locationId) => {
    const response = await api.get('/self_check_ins/qr_data', {
      data: {},
      params: { location_id: locationId },
    });

    return response.data;
  },
  getUserSessionsForSelfCheckIn: async (locationId) => {
    const response = await api.get('/user_sessions/for_self_check_in', {
      data: {},
      params: { location_id: locationId },
    });

    return response.data;
  },
  selfCheckInUserSessions: async (userSessionIds, qrData) => {
    const response = await api.put('/user_sessions/self_check_in', {
      userSessionIds,
      qrData,
    });

    return response.data;
  },
};
