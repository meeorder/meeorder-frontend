import { env } from "@/env.mjs";
import axios from "axios";
import Cookies from "js-cookie";
export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  const jwtToken = Cookies.get("jwt-meeorder") || "";
  request.headers["authorization"] = `Bearer ${jwtToken}`;
  return request;
});
