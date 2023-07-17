import AdminLayout from "@/modules/layout/AdminLayout";
import UserLayout from "@/modules/layout/UserLayout";
import { type LayoutType } from "@/modules/layout/types";
import React from "react";

type AppLayoutProps = {
  layoutType: LayoutType;
  children?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  layoutType = "user",
  children,
}) => {
  switch (layoutType) {
    case "admin":
      return <AdminLayout mainNode={children} />;
    case "user":
      return <UserLayout mainNode={children} />;
    default:
      return <UserLayout mainNode={children} />;
  }
};

export default AppLayout;
