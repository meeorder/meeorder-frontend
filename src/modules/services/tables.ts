import { axiosInstance } from "@/modules/services/axios";
import { paths } from "@/schemas/schema";

export type GetAllTablesResponse =
  paths["/tables"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllTables = async (): Promise<GetAllTablesResponse> => {
  const { data } = await axiosInstance.get<GetAllTablesResponse>("/tables");
  return data;
};

export type CreateTableBodyParam =
  paths["/tables"]["post"]["requestBody"]["content"]["application/json"];

export type CreateTableResponse = paths["/tables"]["post"]["responses"]["201"];

export const createTable = async (
  params: CreateTableBodyParam,
): Promise<void> => {
  await axiosInstance.post<CreateTableResponse>("/tables", params);
};
