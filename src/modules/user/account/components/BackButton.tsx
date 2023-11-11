import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CaretLeft } from "@phosphor-icons/react";
import { Button } from "antd";
import router from "next/router";
import React from "react";

type BackButtonProps = {
  text: string;
};

const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  const onClickBackButton = () => {
    void router.back();
  };

  return (
    <BackButtonContainer onClick={() => onClickBackButton()}>
      <CaretLeft size={24} />
      <Text>{text}</Text>
    </BackButtonContainer>
  );
};

export default BackButton;

const BackButtonContainer = styled(Button)`
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 30%;
  align-items: center;
  justify-content: flex-start;
  min-width: 180px;
  margin-bottom: 12px;
  padding-inline: 0px;
  border: none;
  box-shadow: none;
  background: none;
`;
