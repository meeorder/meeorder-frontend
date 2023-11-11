import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Create a category <<<<======================================//
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

//================>>>> Get all categories <<<<=====================================//
export type GetAllCategoriesResponse =
  paths["/categories"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllCategories = async (): Promise<GetAllCategoriesResponse> => {
  const { data } =
    await axiosInstance.get<GetAllCategoriesResponse>("/categories");
  return data;
};

//================>>>> Get a category by id <<<<===================================//
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

//================>>>> Update a category by id <<<<===============================//
export type UpdateCategoryByIdPathParam =
  paths["/categories/{id}"]["patch"]["parameters"]["path"];

export type UpdateCategoryByIdBodyParam =
  paths["/categories/{id}"]["patch"]["requestBody"]["content"]["application/json"];

export type UpdateCategoryByIdResponse =
  paths["/categories/{id}"]["patch"]["responses"]["200"]["content"]["application/json"];

export const updateCategoryById = async (
  params: UpdateCategoryByIdPathParam & UpdateCategoryByIdBodyParam,
): Promise<UpdateCategoryByIdResponse> => {
  const { data } = await axiosInstance.patch<UpdateCategoryByIdResponse>(
    `/categories/${params.id}`,
    params,
  );
  return data;
};

//================>>>> Delete a category by id <<<<================================//
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

//================>>>> Update a category order by ids <<<<=========================//
export type UpdateCategoryOrderByIdsBodyParam =
  paths["/categories/rank"]["patch"]["requestBody"]["content"]["application/json"];

export type UpdateCategoryOrderByIdsResponse =
  paths["/categories/rank"]["patch"]["responses"]["204"];

export const updateCategoryOrderByIds = async (
  params: UpdateCategoryOrderByIdsBodyParam,
): Promise<void> => {
  await axiosInstance.patch<UpdateCategoryOrderByIdsResponse>(
    "/categories/rank",
    params,
  );
};
