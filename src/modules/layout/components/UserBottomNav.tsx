import { pages, type AllPath } from "@/modules/config/pageConfig";
import styled from "@emotion/styled";
import { type Icon } from "@phosphor-icons/react";
import { Segmented, Typography, theme } from "antd";
import { useEffect, useState } from "react";

const UserBottomNav = () => {
  const { home, basket, orders } = pages;
  const [selected, setSelected] = useState<AllPath>(home.path);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  return (
    <StyledSegmented
      defaultValue={selected}
      onChange={(value) => {
        setSelected(value as AllPath);
      }}
      block
      options={[
        {
          label: (
            <AutoIcon
              Component={home.Icon}
              label={home.label}
              matchKey={home.path}
              matchState={selected}
            />
          ),
          value: home.path,
        },
        {
          label: (
            <AutoIcon
              Component={basket.Icon}
              label={basket.label}
              matchKey={basket.path}
              matchState={selected}
            />
          ),
          value: basket.path,
        },
        {
          label: (
            <AutoIcon
              Component={orders.Icon}
              label={orders.label}
              matchKey={orders.path}
              matchState={selected}
            />
          ),
          value: orders.path,
        },
      ]}
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

  console.log("matchState", matchState);
  console.log("key", matchKey);
  console.log("colorPrimary", colorPrimary);
  return (
    <IconContainer>
      <Component
        key={matchKey}
        size={32}
        fill={matchState === matchKey ? colorPrimary : undefined}
        weight={matchState === matchKey ? "fill" : undefined}
      />
      <Typography.Text
        style={{
          color: matchState === matchKey ? colorPrimary : undefined,
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
