import axiosInstance from "../api/api";

export const webScrap = (url) => {
  console.log("here ...");

  return axiosInstance.post("/scrape", { url });
};
