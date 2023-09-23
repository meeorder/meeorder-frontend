import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Create a coupon <<<<========================================//
export type CreateCouponBodyParam =
  paths["/coupons"]["post"]["requestBody"]["content"]["application/json"];
export type CreateCouponResponse =
  paths["/coupons"]["post"]["responses"]["201"]["content"]["application/json"];

export const createCoupon = async (
  params: CreateCouponBodyParam,
): Promise<CreateCouponResponse> => {
  const { data } = await axiosInstance.post<CreateCouponResponse>(
    "/coupons",
    params,
  );
  return data;
};

//================>>>> Get all coupons <<<<========================================//
export type GetAllCouponsResponse =
  paths["/coupons"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllCoupons = async (): Promise<GetAllCouponsResponse> => {
  const { data } = await axiosInstance.get<GetAllCouponsResponse>("/coupons");
  return data;
};

//================>>>> Get a coupon <<<<===========================================//
export type GetCouponPathParams =
  paths["/coupons/{id}"]["get"]["parameters"]["path"];
export type GetCouponResponse =
  paths["/coupons/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getCoupon = async (
  params: GetCouponPathParams,
): Promise<GetCouponResponse> => {
  const { data } = await axiosInstance.get<GetCouponResponse>(
    `/coupons/${params.id}`,
  );
  return data;
};

//================>>>> Update a coupon <<<<========================================//
export type UpdateCouponPathParams =
  paths["/coupons/{id}"]["patch"]["parameters"]["path"];
export type UpdateCouponBodyParam =
  paths["/coupons/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type UpdateCouponResponse =
  paths["/coupons/{id}"]["patch"]["responses"]["200"]["content"]["application/json"];

export const updateCoupon = async (
  params: UpdateCouponPathParams & UpdateCouponBodyParam,
): Promise<UpdateCouponResponse> => {
  const { data } = await axiosInstance.patch<UpdateCouponResponse>(
    `/coupons/${params.id}`,
    params,
  );
  return data;
};

//================>>>> Delete a coupon <<<<========================================//
export type DeleteCouponPathParams =
  paths["/coupons/{id}"]["delete"]["parameters"]["path"];
export type DeleteCouponResponse =
  paths["/coupons/{id}"]["delete"]["responses"]["200"];

export const deleteCoupon = async (
  params: DeleteCouponPathParams,
): Promise<void> => {
  await axiosInstance.delete<DeleteCouponResponse>(`/coupons/${params.id}`);
};
