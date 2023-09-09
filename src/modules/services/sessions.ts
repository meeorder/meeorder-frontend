import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Get all sessions <<<<=======================================//
export type GetAllSessionsQueryParam =
  paths["/sessions"]["get"]["parameters"]["query"];
export type GetAllSessionsResponse =
  paths["/sessions"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllSessions = async (
  params: GetAllSessionsQueryParam,
): Promise<GetAllSessionsResponse> => {
  const { data } = await axiosInstance.get<GetAllSessionsResponse>(
    "/sessions",
    {
      params,
    },
  );
  return data;
};

//================>>>> Create a session <<<<=======================================//
export type CreateSessionBodyParam =
  paths["/sessions"]["post"]["requestBody"]["content"]["application/json"];
export type CreateSessionResponse =
  paths["/sessions"]["post"]["responses"]["201"]["content"]["application/json"];

export const createSession = async (
  params: CreateSessionBodyParam,
): Promise<CreateSessionResponse> => {
  const { data } = await axiosInstance.post<CreateSessionResponse>(
    "/sessions",
    params,
  );
  return data;
};

//================>>>> Get a session by id <<<<====================================//
export type GetSessionByIdPathParam =
  paths["/sessions/{id}"]["get"]["parameters"]["path"];
export type GetSessionByIdResponse =
  paths["/sessions/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getSessionById = async (
  params: GetSessionByIdPathParam,
): Promise<GetSessionByIdResponse> => {
  const { data } = await axiosInstance.get<GetSessionByIdResponse>(
    `/sessions/${params.id}`,
  );
  return data;
};

//================>>>> Delete a session <<<<=======================================//
export type DeleteSessionByIdPathParam =
  paths["/sessions/{id}"]["delete"]["parameters"]["path"];
export type DeleteSessionByIdResponse =
  paths["/sessions/{id}"]["delete"]["responses"]["204"];

export const deleteSessionById = async (
  params: DeleteSessionByIdPathParam,
): Promise<void> => {
  await axiosInstance.delete<DeleteSessionByIdResponse>(
    `/sessions/${params.id}`,
  );
};

//================>>>> Get a session by table id <<<<==============================//
export type GetSessionByTableIdPathParam =
  paths["/sessions/table/{id}"]["get"]["parameters"]["path"];
export type GetSessionByTableIdResponse =
  paths["/sessions/table/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export const getSessionByTableId = async (
  params: GetSessionByTableIdPathParam,
): Promise<GetSessionByTableIdResponse> => {
  const { data } = await axiosInstance.get<GetSessionByTableIdResponse>(
    `/sessions/table/${params.id}`,
  );
  return data;
};

//================>>>> Set session finish<<<<======================================//
export type SetSessionFinishByIdPathParam =
  paths["/sessions/{id}/finish"]["patch"]["parameters"]["path"];
export type SetSessionFinishByIdResponse =
  paths["/sessions/{id}/finish"]["patch"]["responses"]["204"];

export const setSessionFinishById = async (
  params: SetSessionFinishByIdPathParam,
): Promise<void> => {
  await axiosInstance.patch<SetSessionFinishByIdResponse>(
    `/sessions/${params.id}/finish`,
  );
};

//================>>>> Get orders by session id <<<<================================//
export type GetOrdersBySessionIdPathParam =
  paths["/sessions/{id}/orders"]["get"]["parameters"]["path"];

export type GetOrdersBySessionIdResponse =
  paths["/sessions/{id}/orders"]["get"]["responses"]["200"]["content"]["application/json"];

export const getOrdersBySessionId = async (
  params: GetOrdersBySessionIdPathParam,
): Promise<GetOrdersBySessionIdResponse> => {
  const { data } = await axiosInstance.get<GetOrdersBySessionIdResponse>(
    `/sessions/${params.id}/orders`,
  );
  return data;
};

//================>>>> Update session user <<<<====================================//

export type UpdateSessionUserByIdPathParam =
  paths["/sessions/{id}/user"]["patch"]["parameters"]["path"];
export type UpdateSessionUserByIdBodyParam =
  paths["/sessions/{id}/user"]["patch"]["requestBody"]["content"]["application/json"];

export type UpdateSessionUserByIdResponse =
  paths["/sessions/{id}/user"]["patch"]["responses"]["200"]["content"]["application/json"];

export const updateSessionUserById = async (
  params: UpdateSessionUserByIdPathParam & UpdateSessionUserByIdBodyParam,
): Promise<UpdateSessionUserByIdResponse> => {
  const { data } = await axiosInstance.patch<UpdateSessionUserByIdResponse>(
    `/sessions/${params.id}/user`,
    params,
  );
  return data;
};

//================>>>> Get all usable coupons in session <<<<======================//

export type GetAllUsableCouponsInSessionPathParam =
  paths["/sessions/{id}/coupon/all"]["get"]["parameters"]["path"];
export type GetAllUsableCouponsInSessionResponse =
  paths["/sessions/{id}/coupon/all"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllUsableCouponsInSession = async (
  params: GetAllUsableCouponsInSessionPathParam,
): Promise<GetAllUsableCouponsInSessionResponse> => {
  const { data } =
    await axiosInstance.get<GetAllUsableCouponsInSessionResponse>(
      `/sessions/${params.id}/coupon/all`,
    );
  return data;
};

//================>>>> Update coupon in session <<<<===============================//

export type UpdateCouponInSessionPathParam =
  paths["/sessions/{id}/coupon"]["patch"]["parameters"]["path"];
export type UpdateCouponInSessionBodyParam =
  paths["/sessions/{id}/coupon"]["patch"]["requestBody"]["content"]["application/json"];

export type UpdateCouponInSessionResponse =
  paths["/sessions/{id}/coupon"]["patch"]["responses"]["204"];

export const updateCouponInSession = async (
  params: UpdateCouponInSessionPathParam & UpdateCouponInSessionBodyParam,
): Promise<void> => {
  await axiosInstance.patch<UpdateCouponInSessionResponse>(
    `/sessions/${params.id}/coupon`,
    params,
  );
};
