import {
  getSessionById,
  type GetSessionByIdResponse,
} from "@/modules/services/sessions";
import { useBasketStore } from "@/modules/user/basket/hooks/useBasketStore";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  autoClearBasket = true,
) => {
  const { clearSession, setSession, session } = useSessionStore((state) => ({
    session: state.session,
    setSession: state.setSession,
    clearSession: state.clearSession,
  }));

  const deleteAllBasketOrder = useBasketStore(
    (state) => state.deleteAllBasketOrder,
  );

  useQuery({
    queryKey: ["getSessionById", sessionId],
    queryFn: () =>
      getSessionById({
        id: sessionId,
      }),
    onSuccess: (newSession) => {
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
    },
    enabled: !!sessionId && session?._id !== sessionId,
  });
};

export const useRevalidateSession = () => {
  const { session, setSession, clearSession } = useSessionStore((state) => ({
    session: state.session,
    setSession: state.setSession,
    clearSession: state.clearSession,
  }));
  useQuery({
    queryKey: ["getSessionById", session?._id],
    queryFn: () =>
      getSessionById({
        id: session?._id ?? "",
      }),
    onSuccess: (newSession) => {
      if (newSession?.finished_at !== null) {
        clearSession();
        return;
      }
      setSession(newSession);
    },
    onError: () => {
      console.error("Session not found");
      clearSession();
    },
    enabled: !!session?._id,
  });
};
