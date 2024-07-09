import axios from "axios";

const newRequest = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default newRequest;
