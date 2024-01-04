import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default HTTP;