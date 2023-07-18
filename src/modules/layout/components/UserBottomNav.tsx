import { pages, type PageId } from "@/modules/config/pageConfig";
import styled from "@emotion/styled";
import { type Icon } from "@phosphor-icons/react";
import { ConfigProvider, Segmented, Typography, theme } from "antd";
import Link from "next/link";

type UserBottomNavProps = {
  currentPageId: PageId;
};

const UserBottomNav: React.FC<UserBottomNavProps> = ({ currentPageId }) => {
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
        defaultValue={currentPageId}
        block
        options={[home, basket, orders].map((page) => ({
          label: (
            <AutoIcon
              Component={page.Icon}
              label={page.label}
              iconId={page.id}
              currentPageId={currentPageId}
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
  iconId: PageId;
  currentPageId: PageId;
};

const AutoIcon: React.FC<AutoIconProps> = ({
  Component,
  label,
  iconId,
  currentPageId: currentPageId,
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isMatch = currentPageId === iconId;

  return (
    <IconContainer href={pages?.[iconId]?.path}>
      <Component
        key={iconId}
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
