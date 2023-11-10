import axios from 'axios';
import Cookies from 'js-cookie';

const HTTP = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default HTTP;