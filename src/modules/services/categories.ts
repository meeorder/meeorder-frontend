import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllCategoriesResponse =
  paths["/categories"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllCategories = async (): Promise<GetAllCategoriesResponse> => {
  const { data } =
    await axiosInstance.get<GetAllCategoriesResponse>("/categories");
  return data;
};

export type GetCategoryByIdPathParam =
  paths["/categories/{id}"]["get"]["parameters"]["path"];

export type GetCategoryByIdResponse =
  paths["/categories/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getCategoryById = async (
  params: GetCategoryByIdPathParam,
): Promise<GetCategoryByIdResponse> => {
  const { data } = await axiosInstance.get<GetCategoryByIdResponse>(
    `/categories/${params.id}`,
  );
  return data;
};

export type CreateCategoryBodyParam =
  paths["/categories"]["post"]["requestBody"]["content"]["application/json"];

export type CreateCategoryResponse =
  paths["/categories"]["post"]["responses"]["201"]["content"]["application/json"];

export const createCategory = async (
  params: CreateCategoryBodyParam,
): Promise<CreateCategoryResponse> => {
  const { data } = await axiosInstance.post<CreateCategoryResponse>(
    "/categories",
    params,
  );
  return data;
};

export type ReplaceCategoryByIdAndDataPathParam =
  paths["/categories/{id}"]["put"]["parameters"]["path"];

export type ReplaceCategoryByIdAndDataBodyParam =
  paths["/categories/{id}"]["put"]["requestBody"]["content"]["application/json"];

export type ReplaceCategoryByIdAndDataResponse =
  paths["/categories/{id}"]["put"]["responses"]["200"]["content"]["application/json"];

export const replaceCategoryByIdAndData = async (
  params: ReplaceCategoryByIdAndDataPathParam &
    ReplaceCategoryByIdAndDataBodyParam,
): Promise<ReplaceCategoryByIdAndDataResponse> => {
  const { data } = await axiosInstance.put<ReplaceCategoryByIdAndDataResponse>(
    `/categories/${params.id}`,
    params,
  );
  return data;
};

export type UpdateCategoryRankByIdsBodyParam =
  paths["/categories/rank"]["patch"]["requestBody"]["content"]["application/json"];

export type UpdateCategoryRankByIdsResponse =
  paths["/categories/rank"]["patch"]["responses"]["204"];

export const updateCategoryRankByIds = async (
  params: UpdateCategoryRankByIdsBodyParam,
): Promise<void> => {
  await axiosInstance.patch<UpdateCategoryRankByIdsResponse>(
    "/categories/rank",
    params,
  );
};

export type DeleteCategoryByIdPathParam =
  paths["/categories/{id}"]["delete"]["parameters"]["path"];

export type DeleteCategoryByIdResponse =
  paths["/categories/{id}"]["delete"]["responses"]["204"];

export const deleteCategoryById = async (
  params: DeleteCategoryByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteCategoryByIdResponse>(
    `/categories/${params.id}`,
  );
};
