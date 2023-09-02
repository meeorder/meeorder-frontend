import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { categories } from "@/modules/admin/mock/categories";
import { ingredientData } from "@/modules/admin/mock/ingredient";
import { H4, H5, Text } from "@/modules/common/components/Typography";
import { type Category } from "@/modules/user/mock/categories";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Result,
  Select,
  Switch,
  theme,
} from "antd";
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
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [imageURL, setImageURL] = useState<string>(
    "https://source.unsplash.com/random/?food&plate&11",
  );
  const [published, setPublished] = useState<boolean>(true);

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

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
    changeToCategoryMode();
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
      setOpenDeleteModal(false);
      // delete menu

      changeToCategoryMode();
    }, 1500);
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
          {consoleSectionMode === "edit-menu" && (
            <>
              <Button
                type="primary"
                danger
                onClick={() => setOpenDeleteModal(true)}
              >
                ลบ
              </Button>
              <StyledModal
                centered
                closable={false}
                maskClosable={false}
                open={openDeleteModal}
                confirmLoading={loadingDelete}
                onOk={handleDelete}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="ยกเลิก"
                okText="ลบ"
                okButtonProps={{ danger: true }}
              >
                <Result
                  status="warning"
                  title={
                    <H4 style={{ paddingBottom: "12px" }}>
                      คุณต้องการจะลบเมนูหรือไม่?
                    </H4>
                  }
                  style={{ paddingBottom: "0px", paddingTop: "0px" }}
                />
              </StyledModal>
            </>
          )}
          <Button type="default" onClick={() => setOpenCancelModal(true)}>
            ยกเลิก
          </Button>
          <StyledModal
            centered
            closable={false}
            maskClosable={false}
            open={openCancelModal}
            onOk={handleCancel}
            onCancel={() => setOpenCancelModal(false)}
            cancelText="ไม่"
            okText="ใช่"
          >
            <Result
              status="warning"
              title={
                <H4 style={{ paddingBottom: "12px" }}>
                  คุณต้องการจะยกเลิกการ
                  {consoleSectionMode === "edit-menu" ? "แก้ไข" : "เพิ่ม"}
                  เมนูหรือไม่?
                </H4>
              }
              style={{ paddingBottom: "0px", paddingTop: "0px" }}
            />
          </StyledModal>
          <Button type="primary" onClick={handleSave}>
            {consoleSectionMode === "edit-menu"
              ? "ยืนยันการแก้ไข"
              : "เพิ่มเมนูใหม่"}
          </Button>
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
                <Select.Option key={category._id} value={category.title}>
                  {category.title}
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
          <div>
            <H5
              style={{
                marginRight: 8,
                display: "inline-block",
                color: published ? token.colorTextQuaternary : token.colorText,
              }}
            >
              แบบร่าง
            </H5>
            <Switch
              title="ปรับเปลี่ยนระหว่างสถานะ แบบร่าง/วางขาย"
              checked={published}
              onChange={(checked) => {
                setPublished(checked ? true : false);
              }}
            />
            <H5
              style={{
                marginLeft: 8,
                display: "inline-block",
                color: published ? token.colorText : token.colorTextQuaternary,
              }}
            >
              วางขาย
            </H5>
          </div>
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

const StyledModal = styled(Modal)`
  padding-top: 20px !important;
  .ant-modal-footer {
    display: flex;
    justify-content: center;
  }
`;
