import { env } from "@/env.mjs";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
