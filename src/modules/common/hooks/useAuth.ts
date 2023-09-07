import { useUserStore } from "@/modules/common/hooks/useUserStore";
import {
  getUser,
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

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ username, password }: RegisterBodyParam) =>
      register({ username, password }),
  });
};

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  return useQuery({
    queryKey: ["user"],
    retry: 1,
    queryFn: () => getUser(),
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });
};
