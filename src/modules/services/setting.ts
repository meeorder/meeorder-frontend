import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllSettingsResponse =
  paths["/settings"]["get"]["responses"]["200"]["content"]["application/json"];
export const getAllSettings = async (): Promise<GetAllSettingsResponse> => {
  const { data } = await axiosInstance.get<GetAllSettingsResponse>("/settings");
  return data;
};

export type UpdateSettingBodyParam =
  paths["/settings"]["patch"]["requestBody"]["content"]["application/json"];
export type UpdateSettingResponse =
  paths["/settings"]["patch"]["responses"]["200"]["content"]["application/json"];
export const updateSetting = async (
  params: UpdateSettingBodyParam,
): Promise<UpdateSettingResponse> => {
  const { data } = await axiosInstance.patch<UpdateSettingResponse>(
    "/settings",
    params,
  );
  return data;
};
