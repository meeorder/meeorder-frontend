import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Create an ingredient <<<<==================================//
export type CreateIngredientBodyParam =
  paths["/ingredients"]["post"]["requestBody"]["content"]["application/json"];
export type CreateIngredientResponse =
  paths["/ingredients"]["post"]["responses"]["201"]["content"]["application/json"];

export const createIngredient = async (
  params: CreateIngredientBodyParam,
): Promise<CreateIngredientResponse> => {
  const { data } = await axiosInstance.post<CreateIngredientResponse>(
    "/ingredients",
    params,
  );
  return data;
};

//================>>>> Get all ingredients <<<<===================================//
export type GetAllIngredientsResponse =
  paths["/ingredients"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllIngredients =
  async (): Promise<GetAllIngredientsResponse> => {
    const { data } =
      await axiosInstance.get<GetAllIngredientsResponse>("/ingredients");
    return data?.reverse();
  };

//================>>>> Get an ingredient by id <<<<================================//
export type GetIngredientByIdPathParam =
  paths["/ingredients/{id}"]["get"]["parameters"]["path"];
export type GetIngredientByIdResponse =
  paths["/ingredients/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getIngredientById = async (
  params: GetIngredientByIdPathParam,
): Promise<GetIngredientByIdResponse> => {
  const { data } = await axiosInstance.get<GetIngredientByIdResponse>(
    `/ingredients/${params.id}`,
  );
  return data;
};

//================>>>> Update an ingredient by id <<<<=============================//
export type UpdateIngredientByIdPathParam =
  paths["/ingredients/{id}"]["patch"]["parameters"]["path"];
export type UpdateIngredientByIdBodyParam =
  paths["/ingredients/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type UpdateIngredientByIdResponse =
  paths["/ingredients/{id}"]["patch"]["responses"]["200"]["content"]["application/json"];

export const updateIngredientById = async (
  params: UpdateIngredientByIdPathParam & UpdateIngredientByIdBodyParam,
): Promise<UpdateIngredientByIdResponse> => {
  const { data } = await axiosInstance.patch<UpdateIngredientByIdResponse>(
    `/ingredients/${params.id}`,
    params,
  );
  return data;
};

//================>>>> Delete an ingredient by id <<<<=============================//
export type DeleteIngredientByIdPathParam =
  paths["/ingredients/{id}"]["delete"]["parameters"]["path"];
export type DeleteIngredientByIdResponse =
  paths["/ingredients/{id}"]["delete"]["responses"]["200"];

export const deleteIngredientById = async (
  params: DeleteIngredientByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteIngredientByIdResponse>(
    `/ingredients/${params.id}`,
  );
};

//================>>>> activate all ingredients <<<<=============================//
export type ActivateAllIngredientsResponse =
  paths["/ingredients/activate/all"]["post"]["responses"]["204"];

export const activateAllIngredients = async (): Promise<void> => {
  await axiosInstance.post<ActivateAllIngredientsResponse>(
    `/ingredients/activate/all`,
  );
};
