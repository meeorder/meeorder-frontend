import { useUserStore } from "@/modules/common/hooks/useUserStore";
import {
  getCurrentUser,
  login,
  register,
  type LoginBodyParam,
  type RegisterBodyParam,
} from "@/modules/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const { refetch } = useUser();
  return useMutation({
    mutationFn: ({ username, password }: LoginBodyParam) =>
      login({ username, password }),
    onSuccess: () => {
      void refetch();
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

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  return useQuery({
    queryKey: ["user"],
    retry: 1,
    queryFn: () => getCurrentUser(),
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });
};
