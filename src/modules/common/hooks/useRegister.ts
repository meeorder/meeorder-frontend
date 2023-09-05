import { register, type LoginBodyParam } from "@/modules/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ username, password }: LoginBodyParam) =>
      register({ username, password }),
    onSuccess: () => {
      console.log("register success");
    },
  });
};
