import { H4 } from "@/modules/common/components/Typography";
import { type CategoryProps } from "@/modules/user/menu/components/Category";
import SimpleFoodCard from "@/modules/user/menu/components/SimpleFoodCard";
import styled from "@emotion/styled";
import { List } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, menus }) => {
  return (
    <StyledList
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
      id={category?._id}
      header={
        <H4
          style={{
            margin: "0px",
            marginLeft: "8px",
          }}
        >
          {category?.title}
        </H4>
      }
      dataSource={menus}
      renderItem={(item) => {
        const menu = item as (typeof menus)[number];
        return <SimpleFoodCard key={menu?._id} menu={menu} />;
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
