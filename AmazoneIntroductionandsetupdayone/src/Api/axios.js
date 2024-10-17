import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "http://127.0.0.1:5001/clone-fcd01/us-central1/api",
  
  baseURL:"https://api-nvrrtywamq-uc.a.run.app"
  //baseURL: "http://127.0.0.1:5000/clone-fcd01/us-central1/api",
});

export { axiosInstance };
