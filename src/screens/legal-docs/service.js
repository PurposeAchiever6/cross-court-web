import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getTermsAndCondtions: async () => {
    const response = await axios.get(`${API_URL}/legals/terms_and_conditions`, {
      data: {},
    });

    return response.data.text;
  },
  getCancelationPolicy: async () => {
    const response = await axios.get(`${API_URL}/legals/cancelation_policy`, {
      data: {},
    });

    return response.data.text;
  },
};
