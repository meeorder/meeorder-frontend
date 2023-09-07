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
          ? "นำออกจากตะกร้า"
          : isNewOrder
          ? `เพิ่มลงตะกร้า ( ฿${price} )`
          : `อัปเดตตะกร้า ( ฿${price} )`}
      </H5>
    </Button>
  );
};

export default SaveButton;
