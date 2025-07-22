import axios from "axios";
import { baseURL } from "../common/SummaryApi";
export const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
