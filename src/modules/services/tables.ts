import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Create a table <<<<=========================================//
export type CreateTableBodyParam =
  paths["/tables"]["post"]["requestBody"]["content"]["application/json"];
export type CreateTableResponse =
  paths["/tables"]["post"]["responses"]["201"]["content"]["application/json"];

export const createTable = async (
  params: CreateTableBodyParam,
): Promise<CreateTableResponse> => {
  const { data } = await axiosInstance.post<CreateTableResponse>(
    "/tables",
    params,
  );
  return data;
};

//================>>>> Get all tables <<<<=========================================//
export type GetAllTablesResponse =
  paths["/tables"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllTables = async (): Promise<GetAllTablesResponse> => {
  const { data } = await axiosInstance.get<GetAllTablesResponse>("/tables");
  return data;
};

//================>>>> Get a table by id <<<<=========================================//
export type GetTableByIdResponse =
  paths["/tables/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type GetTableByIdParams =
  paths["/tables/{id}"]["get"]["parameters"]["path"];

export const getTableById = async (params: GetTableByIdParams) => {
  const { data } = await axiosInstance.get<GetTableByIdResponse>(
    `/tables/${params.id}`,
  );
  return data;
};

//================>>>> Update a table by id <<<<=========================================//
export type UpdateTableByIdResponse =
  paths["/tables/{id}"]["put"]["responses"]["200"]["content"]["application/json"];

export type UpdateTableByIdParams =
  paths["/tables/{id}"]["put"]["requestBody"]["content"]["application/json"] &
    paths["/tables/{id}"]["put"]["parameters"]["path"];

export const updateTableById = async (params: UpdateTableByIdParams) => {
  const { data } = await axiosInstance.put<UpdateTableByIdResponse>(
    `/tables/${params.id}`,
    params,
  );
  return data;
};

//================>>>> Delete a table <<<<=========================================//
export type DeleteTableByIdResponse =
  paths["/tables/{id}"]["delete"]["responses"]["204"]["content"]["application/json"];

export type DeleteTableByIdParams =
  paths["/tables/{id}"]["delete"]["parameters"]["path"];

export const deleteTableById = async (params: DeleteTableByIdParams) => {
  const { data } = await axiosInstance.delete<DeleteTableByIdResponse>(
    `/tables/${params.id}`,
  );
  return data;
};
