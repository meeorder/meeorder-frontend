import {
  login,
  register,
  type LoginBodyParam,
  type RegisterBodyParam,
} from "@/modules/services/auth";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: LoginBodyParam) =>
      login({ username, password }),
    onSuccess: () => {
      void queryClient.invalidateQueries(["getCurrentUser"]);
    },
  });
};

type UseRegisterParams = {
  onSuccess?: () => void;
};

export const useRegister = (params: UseRegisterParams = {}) => {
  return useMutation({
    mutationFn: ({ username, password }: RegisterBodyParam) =>
      register({ username, password }),
    onSuccess: () => {
      params.onSuccess?.();
    },
  });
};
