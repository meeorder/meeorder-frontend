import { type CategoryProps } from "@/modules/menu/components/Category";
import { Food } from "@/modules/mock/foods";
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
      renderItem={(item) => {
        const food = item as Food
        return (
          <List.Item
            key={food.id}
            extra={
              <Col>
                <StyledImage preview={false} width={100} alt="pic" src={food.imagePath} />
                <StyledButton
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </Col>
            }
          >
            <List.Item.Meta title={food.name} description={`\$${food.price}`} />
          </List.Item>
        );
      }}
    />
  );
};

export default SimpleCategory;

const StyledList = styled(List)`
  .ant-list-bordered {
    padding: 0px;
  }
  .ant-list-item {
    padding: 0px;
    min-height: 117px;
    align-items: flex-start;
    border: 1px solid  ${(props) => props.theme.antd.colorBorder};
    background: ${(props) => props.theme.antd.colorBgBase};
  }
  .ant-list-item-meta {
    width: 240px;
    padding: 24px;
    gap: 8px;
  }
  .ant-image {
    right: 8px;
    top: 8px;
  }
`;
const StyledImage = styled(Image)`
  border-radius: 5.667px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right: 11px;
  top: 73px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${(props) => props.theme.antd.colorPrimary};//var(--primary-6, #1890ff);
`;
