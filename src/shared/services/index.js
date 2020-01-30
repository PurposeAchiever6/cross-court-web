import axios from 'axios';
import humps from 'humps';
import { getHeaders } from 'shared/utils/api';

const API_URL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
  transformResponse: [...axios.defaults.transformResponse, data => humps.camelizeKeys(data)],
  transformRequest: [data => humps.decamelizeKeys(data), ...axios.defaults.transformRequest],
});
