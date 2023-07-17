import { pages, type AllPath } from "@/modules/config/pageConfig";
import styled from "@emotion/styled";
import { type Icon } from "@phosphor-icons/react";
import { Segmented, Typography, theme } from "antd";
import { useEffect, useState } from "react";

const UserBottomNav = () => {
  const { home, basket, orders } = pages;
  const [selected, setSelected] = useState<AllPath>(home.path);

  useEffect(() => {
    console.log("selected page: ", selected);
  }, [selected]);

  return (
    <StyledSegmented
      defaultValue={selected}
      onChange={(value) => {
        setSelected(value as AllPath);
      }}
      block
      options={[home, basket, orders].map((page) => ({
        label: (
          <AutoIcon
            Component={page.Icon}
            label={page.label}
            matchKey={page.path}
            matchState={selected}
          />
        ),
        value: page.path,
      }))}
    />
  );
};

export default UserBottomNav;

type AutoIconProps = {
  Component: Icon;
  label: string;
  matchKey?: string;
  matchState?: string;
};

const AutoIcon: React.FC<AutoIconProps> = ({
  Component,
  label,
  matchKey,
  matchState,
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isMatch = matchState === matchKey;

  return (
    <IconContainer>
      <Component
        key={matchKey}
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
  height: 100%;
  border: none;
  border-radius: 0;

  .ant-segmented-item-label {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
