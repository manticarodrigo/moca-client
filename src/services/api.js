import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    Authorization: 'Token a9886093415439ff273274c966c34f1dd35272d7',
  },
});