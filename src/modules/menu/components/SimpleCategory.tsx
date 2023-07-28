import { H4 } from "@/modules/common/components/Typography";
import { type CategoryProps } from "@/modules/menu/components/Category";
import SimpleFoodCard from "@/modules/menu/components/SimpleFoodCard";
import styled from "@emotion/styled";
import { List } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <StyledList
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
      id={category?.id}
      header={
        <H4
          style={{
            margin: "0px",
            marginLeft: "8px",
          }}
        >
          {category?.name}
        </H4>
      }
      dataSource={foods}
      renderItem={(item) => {
        const food = item as (typeof foods)[number];
        return <SimpleFoodCard key={food.id} food={food} />;
      }}
    />
  );
};

export default SimpleCategory;

const StyledList = styled(List)`
  margin-top: 16px;

  .ant-list-item {
    padding: 0px;
    align-items: flex-start;
  }

  .ant-list-item-meta {
    padding: 24px;
  }

  .ant-list-item-meta-title {
    margin-bottom: 8px !important;
    font-size: 16px !important;
    font-weight: 500 !important;
  }
`;
