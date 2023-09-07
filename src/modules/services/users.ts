import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Common Types <<<<===========================================//

export type Role = "Owner" | "Cashier" | "Employee" | "Customer";

export const mapRoleNameToRolePriority: Record<
  Role,
  OwnerCreateUserBodyParam["role"]
> = {
  Owner: 100,
  Cashier: 50,
  Employee: 25,
  Customer: 1,
};

//================>>>> Owner Create a user <<<<====================================//
export type OwnerCreateUserBodyParam =
  paths["/users"]["post"]["requestBody"]["content"]["application/json"];
export type OwnerCreateUserResponse =
  paths["/users"]["post"]["responses"]["201"]["content"]["application/json"];

export const ownerCreateUser = async (
  params: OwnerCreateUserBodyParam,
): Promise<OwnerCreateUserResponse> => {
  const { data } = await axiosInstance.post<OwnerCreateUserResponse>(
    "/users",
    params,
  );
  return data;
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
