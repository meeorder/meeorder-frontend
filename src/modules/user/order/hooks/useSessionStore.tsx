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

type SessionStore = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "session",
    },
  ),
);

export const useSetNewSessionBySessionId = (
  sessionId: string,
  autoClearBasket = false,
) => {
  const { clearSession, setSession, session } = useSessionStore((state) => ({
    session: state.session,
    setSession: state.setSession,
    clearSession: state.clearSession,
  }));

  const deleteAllBasketOrder = useBasketStore(
    (state) => state.deleteAllBasketOrder,
  );

  const { data: sessionData, refetch } = useQuery({
    queryKey: ["getSessionById", sessionId],
    retry: false,
    queryFn: async () => {
      const data = await getSessionById({
        id: sessionId,
      });
      console.log("Refetch or something", data);
      setSession(data);
      return data;
    },
    refetchInterval: 1000,
    onSuccess: (newSession) => {
      console.log("Refetch or something success newSession", newSession);
      if (newSession?.finished_at !== null) {
        clearSession();
        return;
      }

      if (autoClearBasket) {
        deleteAllBasketOrder();
      }

      setSession(newSession);
    },
    onError: () => {
      console.error("Session not found");
      clearSession();
      deleteAllBasketOrder();
    },
    enabled: !!sessionId,
  });

  return { refetch };
};

export const useRevalidateSession = () => {
  const { session, setSession, clearSession } = useSessionStore((state) => ({
    session: state.session,
    setSession: state.setSession,
    clearSession: state.clearSession,
  }));

  const deleteAllBasketOrder = useBasketStore(
    (state) => state.deleteAllBasketOrder,
  );

  const router = useRouter();
  useQuery({
    queryKey: ["getSessionById", session?._id],
    queryFn: () =>
      getSessionById({
        id: session?._id ?? "",
      }),
    onSuccess: (newSession) => {
      if (newSession?.finished_at !== null) {
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
            clearSession();
            deleteAllBasketOrder();
            void router.push({
              pathname: "/",
            });
          },
          okButtonProps: {
            style: { alignSelf: "center", marginInline: "auto" },
          },
          cancelButtonProps: { style: { display: "none" } },
        });
        clearSession();
        deleteAllBasketOrder();
        return;
      }
    },
  });
};
