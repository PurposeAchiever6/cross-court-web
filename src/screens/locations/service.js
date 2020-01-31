import api from 'shared/services';

import { format } from 'date-fns';

export default {
  getLocations: async () => {
    const response = await api.get(`/locations`, {
      data: {},
    });

    return response.data.locations;
  },
  getSessions: async (locationId = null, date) => {
    const response = await api.get(`/sessions/`, {
      data: {},
      params: {
        from_date: format(new Date(date), 'dd/MM/yyyy'),
        location_id: locationId,
      },
    });

    return response.data.sessions;
  },
};
