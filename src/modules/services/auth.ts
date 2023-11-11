import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Types <<<<==================================================//
export type User =
  paths["/auth/me"]["get"]["responses"]["200"]["content"]["application/json"];

//================>>>> Login <<<<==================================================//
export type LoginBodyParam =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
export type LoginResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

export const login = async (params: LoginBodyParam): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    params,
  );
  return data;
};

//================>>>> Logout <<<<=================================================//
export type LogoutResponse =
  paths["/auth/logout"]["post"]["responses"]["204"]["content"];
export const logout = async (): Promise<void> => {
  await axiosInstance.post<LogoutResponse>("/auth/logout");
};

//================>>>> Register <<<<===============================================//
export type RegisterBodyParam =
  paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];
export type RegisterResponse =
  paths["/auth/register"]["post"]["responses"]["201"]["content"];

export const register = async (params: RegisterBodyParam): Promise<void> => {
  await axiosInstance.post<RegisterResponse>("/auth/register", params);
};

//================>>>> Get current user <<<<=======================================//
export type GetUserResponse = User;
export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const { data } = await axiosInstance.get<GetUserResponse>("/auth/me");
  return data;
};
