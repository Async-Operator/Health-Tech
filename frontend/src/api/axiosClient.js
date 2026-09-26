import axios from "axios";

axios.defaults.withCredentials = true; 
const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default axiosClient;