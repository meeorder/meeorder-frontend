import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type GetAllCouponsResponse =
  paths["/coupons"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllCoupons = async (): Promise<GetAllCouponsResponse> => {
  const { data } = await axiosInstance.get<GetAllCouponsResponse>("/coupons");
  return data;
};

export type GetCouponByIdPathParam =
  paths["/coupons/{id}"]["get"]["parameters"]["path"];

export type GetCouponByIdResponse =
  paths["/coupons/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getCouponById = async (
  params: GetCouponByIdPathParam,
): Promise<GetCouponByIdResponse> => {
  const { data } = await axiosInstance.get<GetCouponByIdResponse>(
    `/coupons/${params.id}`,
  );
  return data;
};

export type CreateCouponBodyParam =
  paths["/coupons"]["post"]["requestBody"]["content"]["application/json"];

export type CreateCouponResponse =
  paths["/coupons"]["post"]["responses"]["201"]["content"]["application/json"];

export const createCoupon = async (
  params: CreateCouponBodyParam,
): Promise<CreateCouponResponse> => {
  console.log(params);
  const { data } = await axiosInstance.post<CreateCouponResponse>(
    "/coupons",
    params,
  );
  return data;
};

export type UpdateCouponByIdPathParam =
  paths["/coupons/{id}"]["put"]["parameters"]["path"];
