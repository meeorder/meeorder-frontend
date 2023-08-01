import { H5 } from "@/modules/common/components/Typography";
import { Button } from "antd";
import React from "react";

type SaveButtonProps = {
  count: number;
};

const SaveButton: React.FC<SaveButtonProps> = ({ count }) => {
  return (
    <Button
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
        {count === 0 ? "Delete From My Cart" : "Save change $99.00"}
      </H5>
    </Button>
  );
};

export default SaveButton;
