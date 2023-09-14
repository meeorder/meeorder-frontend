import { updateSessionUserById } from "@/modules/services/sessions";
import {
  useSessionStore,
  useSetNewSessionBySessionId,
} from "@/modules/user/order/hooks/useSessionStore";
import { useMutation } from "@tanstack/react-query";

export const useSetSessionUser = (isForce = false) => {
  const { session } = useSessionStore();
  const { refetch } = useSetNewSessionBySessionId(session?._id || "");

  return useMutation({
    mutationFn: async () => {
      if (!!session?.user && !isForce) return;

      await updateSessionUserById({
        id: session?._id || "",
      });
    },
    onSuccess: async () => {
      await refetch();
    },
  });
};
