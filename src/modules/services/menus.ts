import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllMenusQueryParam =
  paths["/menus"]["get"]["parameters"]["query"];
export type GetAllMenusResponse =
  paths["/menus"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllMenus = async (
  params: GetAllMenusQueryParam,
): Promise<GetAllMenusResponse> => {
  const { data } = await axiosInstance.get<GetAllMenusResponse>("/menus", {
    params,
  });
  return data;
};

export type GetMenuByIdPathParam =
  paths["/menus/{id}"]["get"]["parameters"]["path"];
export type GetMenuByIdResponse =
  paths["/menus/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getMenuById = async (
  params: GetMenuByIdPathParam,
): Promise<GetMenuByIdResponse> => {
  const { data } = await axiosInstance.get<GetMenuByIdResponse>(
    `/menus/${params.id}`,
  );
  return data;
};

export type CreateMenuBodyParam =
  paths["/menus"]["post"]["requestBody"]["content"]["application/json"];
export type CreateMenuResponse =
  paths["/menus"]["post"]["responses"]["201"]["content"]["application/json"];

export const createMenu = async (
  params: CreateMenuBodyParam,
): Promise<CreateMenuResponse> => {
  const { data } = await axiosInstance.post<CreateMenuResponse>(
    "/menus",
    params,
  );
  return data;
};

export type ReplaceMenuByIdAndDataPathParam =
  paths["/menus/{id}"]["put"]["parameters"]["path"];
export type ReplaceMenuByIdAndDataBodyParam =
  paths["/menus/{id}"]["put"]["requestBody"]["content"]["application/json"];
export type ReplaceMenuByIdAndDataResponse =
  paths["/menus/{id}"]["put"]["responses"]["200"];

export const replaceMenuByIdAndData = async (
  params: ReplaceMenuByIdAndDataPathParam & ReplaceMenuByIdAndDataBodyParam,
): Promise<void> => {
  await axiosInstance.put<ReplaceMenuByIdAndDataResponse>(
    `/menus/${params.id}`,
    params,
  );
};

export type PublishMenuByIdPathParam =
  paths["/menus/{id}/publish"]["patch"]["parameters"]["path"];
export type PublishMenuByIdResponse =
  paths["/menus/{id}/publish"]["patch"]["responses"]["200"];

export const publishMenuById = async (
  params: PublishMenuByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<PublishMenuByIdResponse>(
    `/menus/${params.id}/publish`,
  );
};

export type UnpublishMenuByIdPathParam =
  paths["/menus/{id}/unpublish"]["patch"]["parameters"]["path"];
export type UnpublishMenuByIdResponse =
  paths["/menus/{id}/unpublish"]["patch"]["responses"]["200"];

export const unpublishMenuById = async (
  params: UnpublishMenuByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<UnpublishMenuByIdResponse>(
    `/menus/${params.id}/unpublish`,
  );
};

export type DeleteMenuByIdPathParam =
  paths["/menus/{id}"]["delete"]["parameters"]["path"];
export type DeleteMenuByIdResponse =
  paths["/menus/{id}"]["delete"]["responses"]["200"];

export const deleteMenuById = async (
  params: DeleteMenuByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteMenuByIdResponse>(`/menus/${params.id}`);
};
