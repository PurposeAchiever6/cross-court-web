import axios from 'axios';
import humps from 'humps';
import AuthUtils from 'shared/utils/auth';

const API_URL = process.env.REACT_APP_API_URL;

const ServiceInstance = axios.create({
  baseURL: API_URL,
  transformResponse: [...axios.defaults.transformResponse, data => humps.camelizeKeys(data)],
  transformRequest: [data => humps.decamelizeKeys(data), ...axios.defaults.transformRequest],
});

ServiceInstance.defaults.headers.common['Content-Type'] = 'application/json';

ServiceInstance.interceptors.request.use(
  async config => {
    const tokens = AuthUtils.getTokens();
    const { uid, accessToken, client } = tokens;

    if (tokens) {
      config.headers.uid = uid;
      config.headers.client = client;
      config.headers['access-token'] = accessToken;
    }

    return config;
  },
  async error => Promise.reject(error)
);

// ServiceInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     const originalRequest = error.config;

//     if (!error.response) {
//       return Promise.reject(new Error('Network error'));
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       const tokens = AuthUtils.getTokens();
//       const { uid, accessToken, client } = tokens;

//       originalRequest._retry = true;
//       originalRequest.headers.uid = uid;
//       originalRequest.headers.client = client;
//       originalRequest.headers['access-token'] = accessToken;

//       return axios(originalRequest);
//     }

//     return error.response;
//   }
// );

export default ServiceInstance;
