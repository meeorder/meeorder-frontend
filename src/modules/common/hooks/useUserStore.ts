import { getCurrentUser } from "@/modules/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    retry: 1,
    queryFn: getCurrentUser,
  });
};
