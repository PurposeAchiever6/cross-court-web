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
  reserveSession: async (sessionId, date, referralCode, goal, shootingMachineIds, scouting) => {
    const response = await api.post(`/sessions/${sessionId}/user_sessions`, {
      date: requestFormattedDate(date),
      referralCode,
      goal,
      shootingMachineIds,
      scouting,
    });

    if (referralCode) {
      window.localStorage.removeItem('referralCode');
    }

    return response.data;
  },
  cancelSession: async (sessionId) => {
    const response = await api.put(`/user_sessions/${sessionId}/cancel`, {});

    return response.data.session;
  },
  joinSessionWaitlist: async (sessionId, date) => {
    const response = await api.post(`/sessions/${sessionId}/waitlists`, {
      date: requestFormattedDate(date),
    });

    return response.data;
  },
  removeSessionWaitlist: async (sessionId, date) => {
    const response = await api.delete(`/sessions/${sessionId}/waitlists`, {
      data: { date: requestFormattedDate(date) },
    });

    return response.data;
  },
  voteSession: async (sessionId, date) => {
    const response = await api.post(`/sessions/${sessionId}/votes`, {
      date: requestFormattedDate(date),
    });

    return response.data;
  },
  removeVoteSession: async (sessionId, date) => {
    const response = await api.delete(`/sessions/${sessionId}/votes`, {
      data: { date: requestFormattedDate(date) },
    });

    return response.data;
  },
  addSessionGuest: async (userSessionId, guestInfo) => {
    const response = await api.post('/session_guests', {
      userSessionId,
      guestInfo,
    });

    return response.data;
  },
  removeSessionGuest: async (userSessionId, sessionGuestId) => {
    const response = await api.delete(`/session_guests/${sessionGuestId}`, {
      data: { userSessionId },
    });

    return response.data;
  },
};
