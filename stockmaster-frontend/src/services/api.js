import axios from "axios";
import { meta } from "eslint-plugin-react-hooks";

const api = axios.create({
  baseURL: meta.env.HOST_API, // sua API backend
  timeout: 50000 // tempo limite de 10 segundos
});

export default api;
