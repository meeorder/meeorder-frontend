import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

export type Role = OwnerCreateUserBodyParam["role"];
export type RoleNumber = GetAllUsersResponse[number]["role"];

export const roleNumberToRole: Record<RoleNumber, Role> = {
  "1": "Customer",
  "25": "Employee",
  "50": "Cashier",
  "100": "Owner",
};

export const roleToRoleNumber: Record<Role, RoleNumber> = {
  Customer: 1,
  Employee: 25,
  Cashier: 50,
  Owner: 100,
};

//================>>>> Owner Create a user <<<<====================================//
export type OwnerCreateUserBodyParam =
  paths["/users"]["post"]["requestBody"]["content"]["application/json"];
export type OwnerCreateUserResponse =
  paths["/users"]["post"]["responses"]["201"];

export const ownerCreateUser = async (
  params: OwnerCreateUserBodyParam,
): Promise<void> => {
  await axiosInstance.post<OwnerCreateUserResponse>("/users", params);
};

//================>>>> Get all users <<<<==========================================//
export type GetAllUsersQueryParams =
  paths["/users"]["get"]["parameters"]["query"];
export type GetAllUsersResponse =
  paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllUsers = async (
  params: GetAllUsersQueryParams,
): Promise<GetAllUsersResponse> => {
  const { data } = await axiosInstance.get<GetAllUsersResponse>("/users", {
    params,
  });
  return data;
};

//================>>>> Delete a user <<<<==========================================//
export type DeleteUserQueryParams =
  paths["/users"]["delete"]["parameters"]["query"];
export type DeleteUserResponse = paths["/users"]["delete"]["responses"]["204"];

export const deleteUser = async (
  params: DeleteUserQueryParams,
): Promise<void> => {
  await axiosInstance.delete<DeleteUserResponse>("/users", {
    params,
  });
};

//================>>>> Reset a user password <<<<==================================//
export type ResetUserPasswordQueryParams =
  paths["/users/reset/password"]["post"]["parameters"]["query"];
export type ResetUserPasswordResponse =
  paths["/users/reset/password"]["post"]["responses"]["204"];

export const resetUserPassword = async (
  params: ResetUserPasswordQueryParams,
): Promise<void> => {
  await axiosInstance.post<ResetUserPasswordResponse>(
    "/users/reset/password",
    null,
    {
      params,
    },
  );
};
