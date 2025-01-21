import { base_url } from "@/config";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

export default axiosClient;
