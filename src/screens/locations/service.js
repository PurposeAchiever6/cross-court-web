/* eslint-disable default-param-last */
import api from 'shared/services';

import { requestFormattedDate } from 'shared/utils/date';

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
        from_date: requestFormattedDate(date),
        location_id: locationId,
      },
    });

    return response.data.sessions;
  },
};
