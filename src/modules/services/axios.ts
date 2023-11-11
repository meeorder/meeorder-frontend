import { env } from "@/env.mjs";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  // const jwtToken = Cookies.get("jwt-meeorder") || "";
  const jwtToken = localStorage.getItem("jwt-meeorder") || "";
  request.headers["authorization"] = `Bearer ${jwtToken}`;
  return request;
});
