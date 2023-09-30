import { deleteUser } from "@/modules/services/users";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["useDeleteUser"],
    mutationFn: (_id: string) => deleteUser({ id: _id }),
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllUser"]);
    },
  });
};

export default useDeleteUser;
