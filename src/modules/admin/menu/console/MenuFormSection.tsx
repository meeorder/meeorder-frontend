import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { categories } from "@/modules/admin/mock/categories";
import { ingredientData } from "@/modules/admin/mock/ingredient";
import { H4, Text } from "@/modules/common/components/Typography";
import { type Category } from "@/modules/user/mock/categories";
import styled from "@emotion/styled";
import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import Image from "next/image";
import React, { useState } from "react";

type FieldType = {
  name: string;
  price: number;
  category?: Category;
  ingredients?: string;
  description?: string;
  imageURL?: string;
};

const MenuFormSection: React.FC = () => {
  const { consoleSectionMode, editMenuId, changeToCategoryMode } =
    useConsoleSectionMode();
  const [form] = Form.useForm();
  const [imageURL, setImageURL] = useState<string>(
    "https://source.unsplash.com/random/?food&plate&11",
  );

  if (consoleSectionMode === "edit-menu") {
    // TODO: get menu data from api then set value to form
  }

  const handleFormSubmit = (values: FieldType) => {
    // TODO: send data to api
    console.log(values);
  };

  const handleSave = () => {
    form.submit();
  };

  const handleCancel = () => {
    // mock
    changeToCategoryMode();
    // TODO: popup confirm
    // TODO: if no close popup
    // TODO: if yes redirect to menu
  };

  const handleDelete = () => {
    // TODO: popup confirm
    // TODO: if no close popup
    // TODO: if yes delete menu redirect to menu
  };

  return (
    <MenuFormCard
      title={
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          <H4>{consoleSectionMode === "edit-menu" ? "แก้ไข" : "เพิ่ม"}เมนู</H4>
          {consoleSectionMode === "edit-menu" && (
            <Text type="secondary"> ({editMenuId}) </Text>
          )}
        </div>
      }
      bordered={false}
      extra={
        <ButtonGroup>
          <Button type="primary" onClick={handleSave}>
            บันทึก
          </Button>
          <Button type="default" onClick={handleCancel}>
            ยกเลิก
          </Button>
          {consoleSectionMode === "edit-menu" && (
            <Button type="primary" danger onClick={handleDelete}>
              ลบ
            </Button>
          )}
        </ButtonGroup>
      }
    >
      <MenuFormContainer
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
        requiredMark="optional"
      >
        <GeneralFormItemsContainer>
          <Form.Item<FieldType>
            name="name"
            label="ชื่อ"
            rules={[{ required: true, message: "กรุณาระบุชื่อของรายการนี้" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="ข้าวไข่เจียว" />
          </Form.Item>

          <Form.Item<FieldType>
            name="price"
            label="ราคา"
            rules={[{ required: true, message: "กรุณาระบุราคาของรายการนี้" }]}
            style={{ width: "100%" }}
          >
            <InputNumber
              addonAfter="฿"
              controls={false}
              placeholder="50"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="category"
            label="หมวดหมู่"
            style={{ width: "100%" }}
          >
            <Select allowClear>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="ingredients"
            label="ส่วนประกอบ"
            style={{ width: "100%" }}
          >
            <Select mode="tags" placeholder="ไข่" allowClear>
              {ingredientData.map((ingredient) => (
                <Select.Option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="description"
            label="คำอธิบาย"
            style={{ width: "100%", height: "100%" }}
          >
            <Input.TextArea
              placeholder="เมนูที่อร่อยที่สุดในโลก"
              showCount
              maxLength={100}
              size="large"
            />
          </Form.Item>
        </GeneralFormItemsContainer>
        <ImageFormItemsContainer>
          <StyledImage
            src={imageURL}
            alt="Food image"
            width={296}
            height={296}
            unoptimized
          />
          <Form.Item<FieldType>
            name="imageURL"
            label="URL รูปภาพ"
            style={{ width: "100%" }}
          >
            <Input
              placeholder="https://..."
              onChange={(e) => {
                if (e.target.value) {
                  setImageURL(e.target.value);
                } else {
                  setImageURL(
                    "https://source.unsplash.com/random/?food&plate&11",
                  );
                }
              }}
            />
          </Form.Item>
        </ImageFormItemsContainer>
      </MenuFormContainer>
    </MenuFormCard>
  );
};

export default MenuFormSection;

const MenuFormCard = styled(Card)`
  flex: 2;
  padding: 0px 24px 24px 24px;
  .ant-card-head {
    padding: 0;
    height: 64px;
  }
  .ant-card-body {
    padding: 0;
    height: calc(100% - 64px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MenuFormContainer = styled(Form<FieldType>)`
  display: flex;
  padding: 12px 12px 0px 12px;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const GeneralFormItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 50%;
`;

const ImageFormItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledImage = styled(Image)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
