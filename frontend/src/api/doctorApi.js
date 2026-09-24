import axios from "axios";

export const getDoctors = () => 
  axios.get("http://localhost:5000/doctors");