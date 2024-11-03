import axios from 'axios';

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('/upload', formData, {
    onUploadProgress,
  });
};
