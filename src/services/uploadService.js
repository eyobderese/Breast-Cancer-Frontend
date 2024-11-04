import axiosInstance from "../api/api";

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("here ...");

  return axiosInstance.post("/upload", formData);
};
