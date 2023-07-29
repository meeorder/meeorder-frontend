import AdminSideNav from "@/modules/admin/layout/AdminSideNav";
import WireFrame from "@/modules/mock/components/WireFrame";
import { type PageId } from "@/modules/pageConfig";

import { Layout } from "antd";
import React from "react";

type AdminLayoutProps = {
  mainNode?: React.ReactNode;
  currentPageId: PageId;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({
  mainNode = <WireFrame contentNode="MainContent" cardColor="red" />,
  currentPageId,
}) => {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <AdminSideNav currentPageId={currentPageId} />
      <Layout>
        <Layout.Content
          style={{
            margin: "24px 24px",
            overflow: "auto",
          }}
        >
          {mainNode}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
