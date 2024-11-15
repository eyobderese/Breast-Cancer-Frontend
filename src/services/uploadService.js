import axiosInstance from "../api/api";

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("image", file);
  console.log("here ...");

  return axiosInstance.post("/predict", formData);
};
