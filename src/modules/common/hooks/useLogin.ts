import { login, type LoginBodyParam } from "@/modules/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: LoginBodyParam) =>
      login({ username, password }),
  });
};
