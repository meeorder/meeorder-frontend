import { type PageId } from "@/modules/config/pageConfig";
import AdminLayout from "@/modules/layout/AdminLayout";
import UserLayout from "@/modules/layout/UserLayout";
import { type LayoutType } from "@/modules/layout/types";
import React from "react";

type AppLayoutProps = {
  layoutType: LayoutType;
  nowPageId: PageId;
  children?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  layoutType = "user",
  nowPageId,
  children,
}) => {
  switch (layoutType) {
    case "admin":
      return <AdminLayout mainNode={children} />;
    case "user":
      return <UserLayout mainNode={children} nowPageId={nowPageId} />;
    default:
      return <UserLayout mainNode={children} nowPageId={nowPageId} />;
  }
};

export default AppLayout;
