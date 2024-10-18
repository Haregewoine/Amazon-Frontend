import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase function
  //baseURL: "http://127.0.0.1:5001/clone-fcd01/us-central1/api",
  //deployed version of firebase function
  //baseURL:"https://api-nvrrtywamq-uc.a.run.app"
  //deployed version of amazon server on render.com
  baseURL:"https://amazon-api-deploy-3-ccmr.onrender.com/api"
  //baseURL: "http://127.0.0.1:5000/clone-fcd01/us-central1/api",
});

export { axiosInstance };
