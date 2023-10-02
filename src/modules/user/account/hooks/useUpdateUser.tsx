import { updateUser } from "@/modules/services/users";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

type Param = {
  OnSuccess?: () => void;
  OnError?: () => void;
};

export const useUpdateUser = (param?: Param) => {
  return useMutation({
    mutationKey: ["useUpdateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      void queryClient.invalidateQueries(["getCurrentUser"]);
      param?.OnSuccess && param.OnSuccess();
    },
    onError: () => {
      param?.OnError && param.OnError();
    },
  });
};
