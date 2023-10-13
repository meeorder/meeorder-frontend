import { useUser } from "@/modules/common/hooks/useUserStore";
import { roleToRoleNumber, type Role } from "@/modules/services/users";
import { useRouter } from "next/router";
import { useEffect } from "react";

type UseProtectedRouteArgs = {
  minimumRole?: Role;
  redirectTo?: string;
};

const useProtectedRoute = (args?: UseProtectedRouteArgs) => {
  const { minimumRole, redirectTo = "/login" } = args ?? {};

  const router = useRouter();
  const { data: user, isSuccess, isError } = useUser();

  useEffect(() => {
    if (!minimumRole) {
      return;
    }

    if ((isSuccess || isError) && !user) {
      void router.push("/signin");
    }

    if (user && user.role < roleToRoleNumber[minimumRole]) {
      void router.push(redirectTo);
    }
  }, [minimumRole, redirectTo, router, user, isSuccess, isError]);
};

export default useProtectedRoute;
