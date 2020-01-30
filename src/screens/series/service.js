import api from 'shared/services';

export default {
  getAllProducts: async () => {
    const response = await api.get(`/products`, {
      data: {},
    });

    const freeSession = {
      name: 'Free Session',
      description: '1 session for free',
      price: '0',
    };

    return [...response.data.products, freeSession];
  },
};
