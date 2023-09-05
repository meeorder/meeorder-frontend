import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type RegisterBodyParam =
  paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];
export type RegisterResponse =
  paths["/auth/register"]["post"]["responses"]["201"]["content"];
export const register = async (params: RegisterBodyParam): Promise<void> => {
  await axiosInstance.post<RegisterResponse>("/auth/register", params);
};

export type LoginBodyParam =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
export const login = async (params: LoginBodyParam): Promise<void> => {
  await axiosInstance.post<void>("/auth/login", params);
};

export type LogoutResponse =
  paths["/auth/logout"]["post"]["responses"]["204"]["content"];
export const logout = async (): Promise<void> => {
  await axiosInstance.post<LogoutResponse>("/auth/logout");
};
