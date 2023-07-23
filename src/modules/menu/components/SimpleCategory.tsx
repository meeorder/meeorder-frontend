import { type CategoryProps } from "@/modules/menu/components/Category";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Col, Image, List } from "antd";
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
            <Col>
              <StyledImage
                width={100}
                alt="pic"
                src={item.imagePath}
              />
              <StyledButton
                type="primary"
                shape="circle"
                icon={<PlusOutlined/>}
              />
            </Col>
          }>
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
    padding: 0px;
    display: flex;
    min-height: 117px;
    align-items: flex-start;
    align-self: stretch;
    border: 1px solid var(--neutral-4, #F0F0F0);
    background: var(--neutral-1, #FFF);
  }
  .ant-list-item-meta {
    display: flex;
    width: 240px;
    padding: 24px;
    align-items: flex-start;
    gap: 8px;
  }
  .ant-image {
    right: 8px;
    top: 8px;
  }
  .ant-image-mask {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    position: absolute;
    right: 8px;
    top: 8px;
  }
`
const StyledImage = styled(Image)`
  border-radius: 5.667px;
  background: url(<path-to-image>), lightgray -2.864px -1.372px / 134.727% 165.318% no-repeat;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right: 11px;
  top: 73px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--primary-6, #1890FF);
  background: var(--primary-6, #1890FF);
  /* drop-shadow/button-primary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
`