import { H3 } from "@/modules/common/components/Typography";
import {
  getSessionById,
  type GetSessionByIdResponse,
} from "@/modules/services/sessions";
import { useBasketStore } from "@/modules/user/basket/hooks/useBasketStore";
import { HandsPraying } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const { confirm } = Modal;
export type Session = GetSessionByIdResponse;

type SessionIdStore = {
  sessionId: string | null;
  setSessionId: (sessionId: string) => void;
  clearSessionId: () => void;
};

export const useSessionIdStore = create<SessionIdStore>()(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (sessionId) => set({ sessionId }),
      clearSessionId: () => set({ sessionId: null }),
    }),
    {
      name: "sessionId",
    },
  ),
);

export const useSession = () => {
  const { sessionId, clearSessionId } = useSessionIdStore();
  const { deleteAllBasketOrder } = useBasketStore();
  const router = useRouter();
  const session = useQuery({
    queryKey: ["getSessionById", sessionId],
    queryFn: () =>
      getSessionById({
        id: sessionId ?? "",
      }),
    enabled: !!sessionId,
    onSuccess: (newSession) => {
      if (newSession?.finished_at !== null) {
        clearSessionId();
        deleteAllBasketOrder();
        confirm({
          title: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <H3>โต๊ะนี้ถูกปิดแล้ว ขอบคุณที่ใช้บริการ ค่ะ</H3>
              <HandsPraying size={96} />
            </div>
          ),
          icon: null,
          centered: true,
          onOk() {
            Modal.destroyAll();
            void router.push({
              pathname: "/",
            });
          },
          okButtonProps: {
            style: { alignSelf: "center", marginInline: "auto" },
          },
          cancelButtonProps: { style: { display: "none" } },
        });
        return;
      }
    },
  });

  return session;
};
