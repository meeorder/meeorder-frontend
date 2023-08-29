import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllAddonsResponse =
  paths["/addons"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllAddons = async (): Promise<GetAllAddonsResponse> => {
  const { data } = await axiosInstance.get<GetAllAddonsResponse>("/addons");
  return data;
};

export type GetAddonByIdPathParam =
  paths["/addons/{id}"]["get"]["parameters"]["path"];

export type GetAddonByIdResponse =
  paths["/addons/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAddonById = async (
  params: GetAddonByIdPathParam,
): Promise<GetAddonByIdResponse> => {
  const { data } = await axiosInstance.get<GetAddonByIdResponse>(
    `/addons/${params.id}`,
  );
  return data;
};

export type CreateAddonBodyParam =
  paths["/addons"]["post"]["requestBody"]["content"]["application/json"];

export type CreateAddonResponse =
  paths["/addons"]["post"]["responses"]["201"]["content"]["application/json"];

export const createAddon = async (
  params: CreateAddonBodyParam,
): Promise<CreateAddonResponse> => {
  const { data } = await axiosInstance.post<CreateAddonResponse>(
    "/addons",
    params,
  );
  return data;
};

export type ReplaceAddonByIdAndDataPathParam =
  paths["/addons/{id}"]["put"]["parameters"]["path"];

export type ReplaceAddonByIdAndDataBodyParam =
  paths["/addons/{id}"]["put"]["requestBody"]["content"]["application/json"];

export type ReplaceAddonByIdAndDataResponse =
  paths["/addons/{id}"]["put"]["responses"]["200"]["content"]["application/json"];

export const replaceAddonByIdAndData = async (
  params: ReplaceAddonByIdAndDataPathParam & ReplaceAddonByIdAndDataBodyParam,
): Promise<ReplaceAddonByIdAndDataResponse> => {
  const { data } = await axiosInstance.put<ReplaceAddonByIdAndDataResponse>(
    `/addons/${params.id}`,
    params,
  );
  return data;
};

export type DeleteAddonByIdPathParam =
  paths["/addons/{id}"]["delete"]["parameters"]["path"];

export type DeleteAddonByIdResponse =
  paths["/addons/{id}"]["delete"]["responses"]["204"]["content"]["application/json"];

export const deleteAddonById = async (
  params: DeleteAddonByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteAddonByIdResponse>(`/addons/${params.id}`);
};
