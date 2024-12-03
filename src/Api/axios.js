import axios from "axios";
const axiosInstance = axios.create({
  //baseURL: "http://127.0.0.1:5001/clone-afbc8/us-central1/api",
  baseURL:"https://amazon-api-deploy-1en6.onrender.com"
});

export { axiosInstance };