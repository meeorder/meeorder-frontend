import {
  login,
  logout,
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
    onSuccess: (data) => {
      void queryClient.invalidateQueries(["getCurrentUser"]);
      localStorage.setItem("jwt-meeorder", data?.access_token); // TODO: use cookie instead
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

type UseLogoutParams = {
  onSuccess?: () => void;
};

export const useLogout = (params: UseLogoutParams = {}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("jwt-meeorder"); // TODO: use cookie instead
      void queryClient.clear();
      params.onSuccess?.();
    },
  });
};
