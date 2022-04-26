import api from 'shared/services';

export default {
  getReferrals: async () => {
    const response = await api.get('/user/referrals', {
      data: {},
    });

    return response.data.referrals;
  },
};
