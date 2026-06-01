import axios from "axios";

const api = axios.create({
  baseURL: "https://obligatorio-full-stack-ashy.vercel.app/v1",
});

export default api;