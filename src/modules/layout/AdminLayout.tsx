import WireFrame from "@/modules/mock/components/WireFrame";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";

type AdminLayoutProps = {
  mainNode?: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({
  mainNode = <WireFrame contentNode="MainContent" cardColor="red" />,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
      >
        <WireFrame contentNode="Logo" cardColor="blue" height={"100px"} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              position: "absolute",
              zIndex: 1,
            }}
          />
          <WireFrame contentNode="Header" cardColor="green" />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: "24px 24px",
            background: colorBgContainer,
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
