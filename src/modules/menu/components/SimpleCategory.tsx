import { type CategoryProps } from "@/modules/menu/components/Category";
import styled from "@emotion/styled";
import { Image, List } from "antd";
import React from "react";

const SimpleCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <StyledList
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
        overflow: "hidden",
      }}
      id={category?.id}
      header={<div>{category?.name}</div>}
      bordered
      dataSource={foods}
      renderItem={(item) => (
        <List.Item key={item.id}
          extra={
          <StyledImage
            width={100}
            alt="pic"
            src={item.imagePath}
          />}>
          <List.Item.Meta
            title={item.name}
            description={`\$${item.price}`}
          />
        </List.Item>
      )}
    />
  );
};

export default SimpleCategory;

const StyledList = styled(List)`
  &,
  .ant-list-bordered {
    padding: 0px;
  }
  .ant-list-item {
    padding: 8px;
  }
  .ant-list-item-meta {
    padding-left: 24px;
  }
`
const StyledImage = styled(Image)`
    margin-top: 8px;
    margin-bottom: 8px;
    align-self: stretch;
    width: 100%;
    height: 100%;\
    border-radius: 12px;
    background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        url(<path-to-image>),
        lightgray -2.26px -11.135px / 103.623% 134.454% no-repeat;
`;