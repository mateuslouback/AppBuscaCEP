import axios from "axios";

const api = axios.create({
  baseURL: "https://www.cepaberto.com/api/v3",
});

export default api;
