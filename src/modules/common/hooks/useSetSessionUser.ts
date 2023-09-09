import { useUserStore } from "@/modules/common/hooks/useUserStore";
import { updateSessionUserById } from "@/modules/services/sessions";
import {
  useSessionStore,
  useSetNewSessionBySessionId,
} from "@/modules/user/order/hooks/useSessionStore";
import { useMutation } from "@tanstack/react-query";

export const useSetSessionUser = (
  { isForce }: { isForce: boolean } = { isForce: false },
) => {
  const { session } = useSessionStore();
  const { refetch } = useSetNewSessionBySessionId(session?._id || "");
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      if (!!session?.user && !isForce) return;

      await updateSessionUserById({
        id: session?._id || "",
        user: user?._id || "",
      });
    },
    onSuccess: async () => {
      await refetch();
    },
  });
};
