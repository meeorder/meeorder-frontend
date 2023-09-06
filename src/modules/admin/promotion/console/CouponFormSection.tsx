import { couponData, type CouponDataType } from "@/modules/admin/mock/coupon";
import { getAllMenus } from "@/modules/admin/mock/menu";
import { H4, H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";

import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Switch,
  theme,
  TreeSelect,
} from "antd";
import Image from "next/image";
import { useState } from "react";

type CouponFormSectionModalProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  couponId: string;
  setCouponId: (data: string) => void;
};

const menuByCategoryData = getAllMenus.map((items) => ({
  key: items.category._id,
  value: items.category._id,
  title: items.category.title,
  children: items.menu.map((menu) => ({
    key: menu._id,
    value: menu._id,
    title: menu.title,
  })),
}));

const CouponFormSectionModal: React.FC<CouponFormSectionModalProps> = ({
  openModal,
  setOpenModal,
  couponId,
  setCouponId,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [published, setPublished] = useState(true);
  const [imageURL, setImageURL] = useState(
    "https://source.unsplash.com/random/?food&plate&11",
  );
  const [value, setValue] = useState<string>();

  const handleFormSubmit = (values: CouponDataType) => {
    // TODO: send data to api
    const allReadeamableMenuId = [];
    for (let i = 0; i < values.redeemableMenu.length; i++) {
      const item_id = values.redeemableMenu[i];
      const itemCategory = getAllMenus.find(
        (item) => item.category._id === item_id,
      );
      if (itemCategory) {
        const menuList = itemCategory.menu;
        for (let j = 0; j < menuList.length; j++) {
          const menuId = menuList[j]?._id;
          allReadeamableMenuId.push(menuId);
        }
      } else {
        allReadeamableMenuId.push(item_id);
      }
    }
    values.redeemableMenu = allReadeamableMenuId.map((item) =>
      item ? item?.toString() : "",
    );

    console.log("Form", values);
    setOpenModal(false);
    setCouponId("");
  };

  const handleSave = () => {
    form.submit();
    form.resetFields();
    setCouponId("");
  };

  const handleCancel = () => {
    form.resetFields();
    setCouponId("");
    setOpenModal(false);
  };

  const onChangeRedeemableMenu = (value: string) => {
    setValue(value);
  };

  const coupon = couponData.find((coupon) => coupon._id === couponId);

  return (
    <StyledModal
      key={couponId}
      centered
      closable={false}
      maskClosable={false}
      open={openModal}
      cancelText="ไม่"
      okText="ใช่"
    >
      <CouponFormCard
        title={
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <H4
              style={{
                paddingLeft: "12px",
              }}
            >
              {coupon ? "แก้ไขคูปอง" : "เพิ่มคูปอง"}
            </H4>
          </div>
        }
        bordered={false}
        extra={
          <ButtonGroup>
            <Popconfirm
              title={coupon ? "คุณต้องการจะยกเลิกการแก้ไขคูปองหรือไม่?":"คุณต้องการจะยกเลิกการเพิ่มคูปองหรือไม่?"}
              okText="ใช่"
              cancelText="ไม่"
              onConfirm={() => handleCancel()}>
            <Button type="default">
              ยกเลิก
            </Button>

            </Popconfirm>
            <Button
              type="primary"
              onClick={() => {
                handleSave();
              }}
            >
              บันทึก
            </Button>
          </ButtonGroup>
        }
      >
        <CouponFormContainer
          layout="vertical"
          form={form}
          onFinish={handleFormSubmit}
          requiredMark="optional"
          initialValues={
            coupon
              ? {
                  title: coupon.title,
                  discount: coupon.discount,
                  point: coupon.point,
                  redeemableMenu: coupon.redeemableMenu,
                  numberOfCoupons: coupon.numberOfCoupons,
                  description: coupon?.description,
                  imageURL: coupon?.imageURL,
                  status: coupon.status,
                }
              : {}
          }
        >
          <GeneralFormItemsContainer>
            <Form.Item<CouponDataType>
              name="title"
              label={
                <Text>
                  <RedText>*</RedText>ชื่อคูปอง
                </Text>
              }
              rules={[{ required: true, message: "กรุณาระบุชื่อของคูปองนี้" }]}
              style={{ width: "100%" }}
            >
              <Input placeholder="ตำไทยถูก" />
            </Form.Item>

            <Form.Item<CouponDataType>
              name="discount"
              label={
                <Text>
                  <RedText>*</RedText>ส่วนลด
                </Text>
              }
              rules={[
                { required: true, message: "กรุณาระบุส่วนลดของคูปองนี้" },
              ]}
              style={{ width: "100%" }}
            >
              <InputNumber
                addonAfter="บาท"
                controls={false}
                placeholder="50"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CouponDataType>
              name="point"
              label={
                <Text>
                  <RedText>*</RedText>แต้มที่ต้องใช้
                </Text>
              }
              rules={[{ required: true, message: "กรุณาระบุแต้มของคูปองนี้" }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                addonAfter="เแต้ม"
                controls={false}
                placeholder="100"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CouponDataType>
              name="redeemableMenu"
              label={<Text>เมนูที่ใช้คูปองได้</Text>}
              style={{ width: "100%" }}
            >
              <TreeSelect
                treeData={menuByCategoryData}
                value={value}
                onChange={onChangeRedeemableMenu}
                treeCheckable={true}
                showCheckedStrategy="SHOW_PARENT"
                placeholder="เมนูทั้งหมด"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CouponDataType>
              name="numberOfCoupons"
              label={
                <Text>
                  <RedText>*</RedText>จำนวนคูปอง
                </Text>
              }
              rules={[{ required: true, message: "กรุณาระบุจำนวนของคูปองนี้" }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                controls={false}
                placeholder="50"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CouponDataType>
              name="description"
              label="คำอธิบาย"
              style={{ width: "100%", height: "100%" }}
            >
              <Input.TextArea
                placeholder="คูปองส่วนลด 50 บาท สำหรับเมนูตำไทย"
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
            <Form.Item<CouponDataType>
              name="imageURL"
              label="ลิงค์รูปภาพ"
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

            <div
              style={{
                marginBottom: "24px",
              }}
            >
              <H5
                style={{
                  marginTop: 4,
                  marginRight: 8,
                  textAlign: "center",
                  height: "32px",
                  display: "inline-block",
                  color: published
                    ? token.colorTextQuaternary
                    : token.colorText,
                }}
              >
                แบบร่าง
              </H5>
              <Form.Item<CouponDataType>
                name="status"
                style={{ width: "auto", display: "inline-block" }}
                valuePropName="checked"
              >
                <Switch
                  title="ปรับเปลี่ยนระหว่างสถานะ แบบร่าง/วางขาย"
                  checked={published}
                  onChange={(checked) => {
                    setPublished(checked);
                  }}
                />
              </Form.Item>
              <H5
                style={{
                  marginTop: 4,
                  marginLeft: 8,
                  textAlign: "center",
                  height: "32px",
                  display: "inline-block",
                  color: published
                    ? token.colorText
                    : token.colorTextQuaternary,
                }}
              >
                วางขาย
              </H5>
            </div>
          </ImageFormItemsContainer>
        </CouponFormContainer>
      </CouponFormCard>
    </StyledModal>
  );
};

export default CouponFormSectionModal;

const CouponFormCard = styled(Card)`
  flex: 2;
  .ant-card-head {
    padding: 0;
    margin: 0;
  }
  .ant-card-body {
    padding: 0;
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CouponFormContainer = styled(Form<CouponDataType>)`
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
  width: 60%;
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
  object-fit: cover;
  object-position: center;
`;

const RedText = styled.span`
  color: red;
  margin-right: 4px;
`;

const StyledModal = styled(Modal)`
  width: 860px !important;
  .ant-modal-footer {
    display: none;
  }
`;
