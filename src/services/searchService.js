import axios from 'axios';

export const searchQuery = (query, k) => {
  return axios.post('/search', {
    query,
    k,
  });
};
