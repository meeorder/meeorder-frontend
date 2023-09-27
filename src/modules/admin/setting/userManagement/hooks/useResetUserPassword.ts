import { resetUserPassword } from "@/modules/services/users";
import { useMutation } from "@tanstack/react-query";

const useResetUserPassword = () => {
  return useMutation({
    mutationKey: ["useResetUserPassword"],
    mutationFn: (_id: string) => resetUserPassword({ id: _id }),
  });
};

export default useResetUserPassword;
