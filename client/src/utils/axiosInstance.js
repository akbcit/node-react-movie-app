import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3004',
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
