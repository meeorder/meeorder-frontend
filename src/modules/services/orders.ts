import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllOrdersResponse =
  paths["/orders"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllOrders = async (): Promise<GetAllOrdersResponse> => {
  const { data } = await axiosInstance.get<GetAllOrdersResponse>("/orders");
  return data;
};

export type CreateOrderBodyParam =
  paths["/orders"]["post"]["requestBody"]["content"]["application/json"];

export type CreateOrderResponse = paths["/orders"]["post"]["responses"]["201"];

export const createOrder = async (
  params: CreateOrderBodyParam,
): Promise<void> => {
  await axiosInstance.post<CreateOrderResponse>("/orders", params);
};

export type SetOrderStatusToPreparingByIdPathParam =
  paths["/orders/{id}/preparing"]["patch"]["parameters"]["path"];

export type SetOrderStatusToPreparingByIdResponse =
  paths["/orders/{id}/preparing"]["patch"]["responses"]["204"];

export const setOrderStatusToPreparingById = async (
  params: SetOrderStatusToPreparingByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<SetOrderStatusToPreparingByIdResponse>(
    `/orders/${params.id}/preparing`,
  );
};

export type SetOrderStatusToReadyToServeByIdPathParam =
  paths["/orders/{id}/ready_to_serve"]["patch"]["parameters"]["path"];

export type SetOrderStatusToReadyToServeByIdResponse =
  paths["/orders/{id}/ready_to_serve"]["patch"]["responses"]["204"];

export const setOrderStatusToReadyToServeById = async (
  params: SetOrderStatusToReadyToServeByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<SetOrderStatusToReadyToServeByIdResponse>(
    `/orders/${params.id}/ready_to_serve`,
  );
};

export type SetOrderStatusToDoneByIdPathParam =
  paths["/orders/{id}/done"]["patch"]["parameters"]["path"];

export type SetOrderStatusToDoneByIdResponse =
  paths["/orders/{id}/done"]["patch"]["responses"]["204"];

export const setOrderStatusToDoneById = async (
  params: SetOrderStatusToDoneByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<SetOrderStatusToDoneByIdResponse>(
    `/orders/${params.id}/done`,
  );
};
