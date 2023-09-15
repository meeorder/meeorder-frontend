import { updateSessionUserById } from "@/modules/services/sessions";
import { useSession } from "@/modules/user/order/hooks/useSession";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useSetSessionUser = (isForce = false) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!!session?.user && !isForce) return;

      await updateSessionUserById({
        id: session?._id || "",
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["getSessionById"]);
      void queryClient.invalidateQueries(["getCurrentUser"]);
    },
  });
};
