import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Minus, Plus } from "@phosphor-icons/react";
import { Button } from "antd";
import React from "react";

type AddMinusButtonProps = {
  count: number;
  setCount: (value: number) => void;
  isNewOrder: boolean;
};

const AddMinusButton: React.FC<AddMinusButtonProps> = ({
  count,
  setCount,
  isNewOrder,
}) => {
  return (
    <ButtonAddMinusContainer>
      <Button
        shape="circle"
        size="large"
        icon={<Minus size={16} />}
        disabled={count === (isNewOrder ? 1 : 0)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.04)",
        }}
        onClick={() => {
          if (count > (isNewOrder ? 1 : 0)) {
            setCount(count - 1);
          }
        }}
      />
      <Text>{count}</Text>
      <Button
        shape="circle"
        size="large"
        icon={<Plus size={16} />}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.04)",
        }}
        onClick={() => setCount(count + 1)}
      />
    </ButtonAddMinusContainer>
  );
};

export default AddMinusButton;

const ButtonAddMinusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  align-items: center;
`;
