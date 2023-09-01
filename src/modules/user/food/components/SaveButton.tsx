import { H5 } from "@/modules/common/components/Typography";
import { Button } from "antd";
import React from "react";

type SaveButtonProps = {
  count: number;
  price: number;
  isNewOrder: boolean;
  onClick: () => void;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  count,
  price,
  isNewOrder,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      type="primary"
      size="large"
      danger={count === 0}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <H5 style={{ color: "white" }}>
        {count === 0
          ? "Delete From My Cart"
          : isNewOrder
          ? `Add to Cart ( ${price} THB )`
          : `Save Change ( ${price} THB )`}
      </H5>
    </Button>
  );
};

export default SaveButton;
