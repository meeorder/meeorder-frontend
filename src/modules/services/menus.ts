import { type paths } from "@/modules/common/types/dataTypes";
import { axiosInstance } from "@/modules/services/axios";

//////////////////////////////////////////// GET ////////////////////////////////////////////

export type GetAllMenusQueryParam =
  paths["/api/v1/menus"]["get"]["parameters"]["query"];
export type GetAllMenusResponse =
  paths["/api/v1/menus"]["get"]["responses"]["200"]["content"]["application/json"];

/** get all menus by status: "published" | "draft" | "all" */
export const getAllMenus = async (
  params: GetAllMenusQueryParam,
): Promise<GetAllMenusResponse> => {
  const { data } = await axiosInstance.get<GetAllMenusResponse>(
    "/api/v1/menus",
    {
      params,
    },
  );
  return data;
};

export type GetMenuByIdPathParam =
  paths["/api/v1/menus/{id}"]["get"]["parameters"]["path"];
export type GetMenuByIdResponse =
  paths["/api/v1/menus/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

/** get menu by id */
export const getMenuById = async (
  params: GetMenuByIdPathParam,
): Promise<GetMenuByIdResponse> => {
  const { data } = await axiosInstance.get<GetMenuByIdResponse>(
    `/api/v1/menus/${params.id}`,
  );
  return data;
};

//////////////////////////////////////////// POST ////////////////////////////////////////////

export type CreateMenuBodyParam =
  paths["/api/v1/menus"]["post"]["requestBody"]["content"]["application/json"];
export type CreateMenuResponse =
  paths["/api/v1/menus"]["post"]["responses"]["201"]["content"]["application/json"];

/** create new menu by data */
export const createMenu = async (
  params: CreateMenuBodyParam,
): Promise<CreateMenuResponse> => {
  const { data } = await axiosInstance.post<CreateMenuResponse>(
    "/api/v1/menus",
    params,
  );
  return data;
};

//////////////////////////////////////////// PUT ////////////////////////////////////////////

export type ReplaceMenuByIdAndDataPathParam =
  paths["/api/v1/menus/{id}"]["put"]["parameters"]["path"];
export type ReplaceMenuByIdAndDataBodyParam =
  paths["/api/v1/menus/{id}"]["put"]["requestBody"]["content"]["application/json"];
export type ReplaceMenuByIdAndDataResponse =
  paths["/api/v1/menus/{id}"]["put"]["responses"]["200"];

/** replace menu data by id */
export const replaceMenuByIdAndData = async (
  params: ReplaceMenuByIdAndDataPathParam & ReplaceMenuByIdAndDataBodyParam,
): Promise<ReplaceMenuByIdAndDataResponse> => {
  const { data } = await axiosInstance.put<ReplaceMenuByIdAndDataResponse>(
    `/api/v1/menus/${params.id}`,
    params,
  );
  return data;
};

//////////////////////////////////////////// PATCH ////////////////////////////////////////////

export type PublishMenuByIdPathParam =
  paths["/api/v1/menus/{id}/publish"]["patch"]["parameters"]["path"];
export type PublishMenuByIdResponse =
  paths["/api/v1/menus/{id}/publish"]["patch"]["responses"]["200"];

/** publish menu by id */
export const publishMenuById = async (
  params: PublishMenuByIdPathParam,
): Promise<PublishMenuByIdResponse> => {
  const { data } = await axiosInstance.patch<PublishMenuByIdResponse>(
    `/api/v1/menus/${params.id}/publish`,
  );
  return data;
};

export type UnpublishMenuByIdPathParam =
  paths["/api/v1/menus/{id}/unpublish"]["patch"]["parameters"]["path"];
export type UnpublishMenuByIdResponse =
  paths["/api/v1/menus/{id}/unpublish"]["patch"]["responses"]["200"];

/** unpublish menu by id */
export const unpublishMenuById = async (
  params: UnpublishMenuByIdPathParam,
): Promise<UnpublishMenuByIdResponse> => {
  const { data } = await axiosInstance.patch<UnpublishMenuByIdResponse>(
    `/api/v1/menus/${params.id}/unpublish`,
  );
  return data;
};

//////////////////////////////////////////// DELETE ////////////////////////////////////////////

export type DeleteMenuByIdPathParam =
  paths["/api/v1/menus/{id}"]["delete"]["parameters"]["path"];
export type DeleteMenuByIdResponse =
  paths["/api/v1/menus/{id}"]["delete"]["responses"]["200"];

/** delete menu by id */
export const deleteMenuById = async (
  params: DeleteMenuByIdPathParam,
): Promise<DeleteMenuByIdResponse> => {
  const { data } = await axiosInstance.delete<DeleteMenuByIdResponse>(
    `/api/v1/menus/${params.id}`,
  );
  return data;
};
