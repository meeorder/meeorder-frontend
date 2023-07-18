import { pages, type PageId } from "@/modules/config/pageConfig";
import styled from "@emotion/styled";
import { type Icon } from "@phosphor-icons/react";
import { ConfigProvider, Segmented, Typography, theme } from "antd";
import Link from "next/link";

type UserBottomNavProps = {
  nowPageId: PageId;
};

const UserBottomNav: React.FC<UserBottomNavProps> = ({ nowPageId }) => {
  const { home, basket, orders } = pages;

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: "#ffffff",
            itemActiveBg: "#ffffff",
            colorBgLayout: "#ffffff",
            boxShadowTertiary: "none",
          },
        },
      }}
    >
      <StyledSegmented
        defaultValue={nowPageId}
        block
        options={[home, basket, orders].map((page) => ({
          label: (
            <AutoIcon
              Component={page.Icon}
              label={page.label}
              matchPageId={page.id}
              nowPageId={nowPageId}
            />
          ),
          value: page.id,
        }))}
      />
    </ConfigProvider>
  );
};

export default UserBottomNav;

type AutoIconProps = {
  Component: Icon;
  label: string;
  matchPageId: PageId;
  nowPageId: PageId;
};

const AutoIcon: React.FC<AutoIconProps> = ({
  Component,
  label,
  matchPageId,
  nowPageId,
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isMatch = nowPageId === matchPageId;

  return (
    <IconContainer href={pages?.[matchPageId]?.path}>
      <Component
        key={matchPageId}
        size={32}
        fill={isMatch ? colorPrimary : undefined}
        weight={isMatch ? "fill" : undefined}
      />
      <Typography.Text
        style={{
          color: isMatch ? colorPrimary : undefined,
        }}
      >
        {label}
      </Typography.Text>
    </IconContainer>
  );
};

const StyledSegmented = styled(Segmented)`
  &,
  .ant-segmented-item-label,
  .ant-segmented-item {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    padding: 0;
  }
`;

const IconContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0;
`;
