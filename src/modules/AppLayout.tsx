import AdminLayout from "@/modules/admin/layout/AdminLayout";
import { pages, type PageId } from "@/modules/pageConfig";
import useProtectedRoute from "@/modules/useProtectedRoute";
import UserLayout from "@/modules/user/layout/UserLayout";
import React from "react";

export type LayoutType = "user" | "admin";

type AppLayoutProps = {
  layoutType: LayoutType;
  currentPageId: PageId;
  children?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  layoutType = "user",
  currentPageId,
  children,
}) => {
  useProtectedRoute({
    minimumRole: pages[currentPageId].minimumRole,
    redirectTo: "/404",
  });

  console.log("minimumRole", pages[currentPageId].minimumRole);

  switch (layoutType) {
    case "admin":
      return <AdminLayout mainNode={children} currentPageId={currentPageId} />;
    case "user":
      return <UserLayout mainNode={children} currentPageId={currentPageId} />;
  }
};

export default AppLayout;
