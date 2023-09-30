import { updateUserRole, type Role } from "@/modules/services/users";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserRole = () => {
  return useMutation({
    mutationKey: ["useUpdateUserRole"],
    mutationFn: (data: { id: string; role: Role }) => updateUserRole(data),
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllUser"]);
    },
  });
};

export default useUpdateUserRole;
