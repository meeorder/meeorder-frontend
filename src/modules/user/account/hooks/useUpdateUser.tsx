import { updateUser } from "@/modules/services/users";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["useUpdateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      void queryClient.invalidateQueries(["getCurrentUser"]);
    },
  });
};
