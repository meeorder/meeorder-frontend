import { type PageId } from "@/modules/config/pageConfig";
import AdminLayout from "@/modules/layout/AdminLayout";
import UserLayout from "@/modules/layout/UserLayout";
import { type LayoutType } from "@/modules/layout/types";
import React from "react";

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
      return <AdminLayout mainNode={children} />;
    case "user":
      return <UserLayout mainNode={children} currentPageId={currentPageId} />;
    default:
      return <UserLayout mainNode={children} currentPageId={currentPageId} />;
  }
};

export default AppLayout;
