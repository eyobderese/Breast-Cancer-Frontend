import axiosInstance from "../api/api";

export const searchQuery = (query, k) => {
  return axiosInstance.post("/search", {
    query,
    "top-k": k,
  });
};
