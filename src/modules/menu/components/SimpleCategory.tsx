import { type CategoryProps } from "@/modules/menu/components/Category";
import styled from "@emotion/styled";
import SimpleFoodCard from "@/modules/menu/components/SimpleFoodCard";
import { type Food } from "@/modules/mock/foods";
import { List,Typography } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <StyledList
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
        overflow: "hidden",
      }}
      id={category?.id}
      header={<Typography.Title level={4}>{category?.name}</Typography.Title>}
      bordered
      dataSource={foods}
      renderItem={(item) => {
        const food = item as Food;
        return <SimpleFoodCard key={food.id} food={food} />;
      }}
    />
  );
};

export default SimpleCategory;

const StyledList = styled(List)`
  margin-top: 16px;
  .ant-list-bordered {
    padding: 0px;
  }
  .ant-list-item {
    padding: 0px;
    min-height: 117px;
    align-items: flex-start;
    border: 1px solid ${(props) => props.theme.antd.colorBorder};
    background: ${(props) => props.theme.antd.colorBgBase};
  }
  .ant-col {
    padding-top:8px;
    padding-right:8px;
  }
  .ant-list-item-meta {
    width: 240px;
    padding: 24px;
    gap: 8px;
  }
`;
