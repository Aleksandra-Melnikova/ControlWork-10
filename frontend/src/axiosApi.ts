import axios from "axios";
import { apiURL } from "./globalConstans.ts";

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;
