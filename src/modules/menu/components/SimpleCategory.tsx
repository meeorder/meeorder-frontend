import { type CategoryProps } from "@/modules/menu/components/Category";
import { List } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <List
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
      id={category?.id}
      header={<div>{category?.name}</div>}
      bordered
      dataSource={foods}
      renderItem={(item) => (
        <List.Item>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </List.Item>
      )}
    />
  );
};

export default SimpleCategory;
