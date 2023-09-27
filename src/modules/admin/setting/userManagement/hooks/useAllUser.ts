import {
  getAllUsers,
  type GetAllUsersResponse,
} from "@/modules/services/users";
import { useQuery } from "@tanstack/react-query";

export type AllUser = GetAllUsersResponse;

const useAllUser = () => {
  return useQuery({
    queryKey: ["useAllUser"],
    queryFn: () => getAllUsers({}),
  });
};

export default useAllUser;
