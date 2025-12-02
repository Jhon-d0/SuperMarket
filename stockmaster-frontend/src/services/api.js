import axios from "axios";

const api = axios.create({
  baseURL: process.env.HOST_API, // sua API backend
  timeout: 50000 // tempo limite de 10 segundos
});

export default api;
