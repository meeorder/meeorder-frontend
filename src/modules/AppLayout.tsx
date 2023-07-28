import AdminLayout from "@/modules/admin/layout/AdminLayout";
import { type PageId } from "@/modules/pageConfig";
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
  switch (layoutType) {
    case "admin":
      return <AdminLayout mainNode={children} currentPageId={currentPageId} />;
    case "user":
      return <UserLayout mainNode={children} currentPageId={currentPageId} />;
  }
};

export default AppLayout;
