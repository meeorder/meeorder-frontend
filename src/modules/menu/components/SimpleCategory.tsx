import { type CategoryProps } from "@/modules/menu/components/Category";
import SimpleFoodCard from "@/modules/menu/components/SimpleFoodCard";
import { type Food } from "@/modules/mock/foods";
import styled from "@emotion/styled";
import { List, Typography } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <StyledList
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
      id={category?.id}
      header={
        <Typography.Title
          level={4}
          style={{
            margin: "0px",
            marginLeft: "8px",
          }}
        >
          {category?.name}
        </Typography.Title>
      }
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

  .ant-list-header {
    padding-block: 12px;
  }

  .ant-list-item {
    padding: 0px;
    min-height: 117px;
    align-items: flex-start;
    background: ${(props) => props.theme.antd.colorBgBase};
  }

  .ant-list-item-meta {
    width: 240px;
    padding: 24px;
    gap: 8px;
  }

  .ant-list-item-meta-title {
    margin-bottom: 8px !important;
  }
`;
