import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Create an addon <<<<========================================//
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

//================>>>> Get all addons <<<<=========================================//

export type GetAllAddonsQueryParams =
  paths["/addons"]["get"]["parameters"]["query"];
export type GetAllAddonsResponse =
  paths["/addons"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllAddons = async (
  params: GetAllAddonsQueryParams,
): Promise<GetAllAddonsResponse> => {
  const { data } = await axiosInstance.get<GetAllAddonsResponse>("/addons", {
    params,
  });
  return data?.reverse();
};

//================>>>> Get an addon by id <<<<=====================================//

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

//================>>>> Update an addon by id <<<<==================================//
export type UpdateAddonByIdPathParam =
  paths["/addons/{id}"]["put"]["parameters"]["path"];
export type UpdateAddonByIdBodyParam =
  paths["/addons/{id}"]["put"]["requestBody"]["content"]["application/json"];
export type UpdateAddonByIdResponse =
  paths["/addons/{id}"]["put"]["responses"]["200"]["content"]["application/json"];

export const updateAddonById = async (
  params: UpdateAddonByIdPathParam & UpdateAddonByIdBodyParam,
): Promise<UpdateAddonByIdResponse> => {
  const { data } = await axiosInstance.put<UpdateAddonByIdResponse>(
    `/addons/${params.id}`,
    params,
  );
  return data;
};

//================>>>> Delete an addon by id <<<<==================================//
export type DeleteAddonByIdPathParam =
  paths["/addons/{id}"]["delete"]["parameters"]["path"];
export type DeleteAddonByIdResponse =
  paths["/addons/{id}"]["delete"]["responses"]["204"];

export const deleteAddonById = async (
  params: DeleteAddonByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteAddonByIdResponse>(`/addons/${params.id}`);
};

//================>>>> Change an addon status by id <<<<============================//
export type ChangeAddonStatusByIdPathParam =
  paths["/addons/{id}/activate"]["patch"]["parameters"]["path"];
export type ChangeAddonStatusByIdResponse =
  paths["/addons/{id}/activate"]["patch"]["responses"]["204"];

export const changeAddonStatusById = async (params: {
  id: ChangeAddonStatusByIdPathParam["id"];
  status: "activate" | "deactivate";
}): Promise<void> => {
  await axiosInstance.patch<ChangeAddonStatusByIdResponse>(
    `/addons/${params.id}/${params.status}`,
  );
};

//================>>>> Activate all addons <<<<=====================================//
export type ActivateAllAddonsResponse =
  paths["/addons/activate/all"]["post"]["responses"]["204"];

export const activateAllAddons = async (): Promise<void> => {
  await axiosInstance.post<ActivateAllAddonsResponse>("/addons/activate/all");
};
