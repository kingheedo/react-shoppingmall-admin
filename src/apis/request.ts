import axios from 'axios';
import backUrl from 'config/backUrl';

const request = axios.create({
  baseURL: backUrl,
  withCredentials: true
});

export default request;