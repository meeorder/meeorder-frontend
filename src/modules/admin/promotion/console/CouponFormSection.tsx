import useCouponById from "@/modules/admin/promotion/hook/useCouponById";
import useCreateCoupon from "@/modules/admin/promotion/hook/useCreateCoupon";
import useUpdateCoupon from "@/modules/admin/promotion/hook/useUpdateCoupon";
import { H4, H5, Text } from "@/modules/common/components/Typography";
import { checkImageSrc } from "@/modules/common/utils";
import { type CreateCouponBodyParam } from "@/modules/services/coupons";
import { type GetAllMenusResponse } from "@/modules/services/menus";
import useAllMenu from "@/modules/user/menu/hooks/useAllMenu";
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
import { useEffect, useState } from "react";

type CouponFormSectionModalProps = {
  openModalForm: boolean;
  setOpenModalForm: (open: boolean) => void;
  couponId: string;
  setCouponId: (data: string) => void;
};

const CouponFormSectionModal: React.FC<CouponFormSectionModalProps> = ({
  openModalForm,
  setOpenModalForm,
  couponId,
  setCouponId,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<CreateCouponBodyParam>();
  const [published, setPublished] = useState(true);
  const [imageURL, setImageURL] = useState(
    "https://source.unsplash.com/random/?food&plate&11",
  );
  const { mutate: createCoupon } = useCreateCoupon();
  const { mutate: editCoupon } = useUpdateCoupon();
  const { data: coupon } = useCouponById(couponId);
  const { data: allMenu } = useAllMenu();

  const menuByCategoryData = GetMenuByCategoryData(allMenu ?? []);

  const handleFormSubmit = (values: CreateCouponBodyParam) => {
    values.required_menus = GetAllMenuId(
      allMenu ?? [],
      values.required_menus ?? [],
    );
    const editMode = couponId !== "";
    if (editMode) {
      editCoupon({
        id: couponId,
        ...values,
      });
    } else {
      createCoupon(values);
    }
    form.resetFields();
    setOpenModalForm(false);
    setCouponId("");
  };

  const handleSave = () => {
    form.submit();
    setCouponId("");
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenModalForm(false);
    setCouponId("");
  };

  useEffect(() => {
    form.setFieldsValue({
      ...coupon,
      required_menus: coupon?.required_menus?.map((item) =>
        item ? item?._id?.toString() : "",
      ),
    });
  }, [coupon, form]);

  return (
    <StyledModal
      key={couponId}
      centered
      closable={false}
      maskClosable={false}
      open={openModalForm}
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
        extra={
          <ButtonGroup>
            <Popconfirm
              title={
                coupon
                  ? "คุณต้องการจะยกเลิกการแก้ไขคูปองหรือไม่?"
                  : "คุณต้องการจะยกเลิกการเพิ่มคูปองหรือไม่?"
              }
              okText="ใช่"
              cancelText="ไม่"
              onConfirm={() => handleCancel()}
            >
              <Button type="default">ยกเลิก</Button>
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
        >
          <GeneralFormItemsContainer>
            <Form.Item<CreateCouponBodyParam>
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

            <Form.Item<CreateCouponBodyParam>
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

            <Form.Item<CreateCouponBodyParam>
              name="required_point"
              label={
                <Text>
                  <RedText>*</RedText>แต้มที่ต้องใช้
                </Text>
              }
              rules={[{ required: true, message: "กรุณาระบุแต้มของคูปองนี้" }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                addonAfter="แต้ม"
                controls={false}
                placeholder="100"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CreateCouponBodyParam>
              name="required_menus"
              label={<Text>เมนูที่ใช้คูปองได้</Text>}
              style={{ width: "100%" }}
            >
              <TreeSelect
                treeData={menuByCategoryData}
                treeCheckable={true}
                showCheckedStrategy="SHOW_PARENT"
                placeholder="เมนูทั้งหมด"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item<CreateCouponBodyParam>
              name="quota"
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

            <Form.Item<CreateCouponBodyParam>
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
              src={checkImageSrc(imageURL)}
              alt="Food image"
              width={296}
              height={296}
              unoptimized
            />
            <Form.Item<CreateCouponBodyParam>
              name="image"
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
                ฉบับร่าง
              </H5>
              <Form.Item<CreateCouponBodyParam>
                name="activated"
                style={{ width: "auto", display: "inline-block" }}
                valuePropName="checked"
              >
                <Switch
                  title="ปรับเปลี่ยนระหว่างสถานะ ฉบับร่าง และ แผยแพร่"
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
                แผยแพร่
              </H5>
            </div>
          </ImageFormItemsContainer>
        </CouponFormContainer>
      </CouponFormCard>
    </StyledModal>
  );
};

export default CouponFormSectionModal;

const GetAllMenuId = (
  allMenu: GetAllMenusResponse,
  required_menus: string[],
) => {
  const allRedeemableMenuId = [];
  if (required_menus) {
    for (let i = 0; i < required_menus.length; i++) {
      const item_id = required_menus[i];
      const itemCategory = allMenu?.find(
        (item) => item.category._id === item_id,
      );
      if (itemCategory) {
        const menuList = itemCategory.menus;
        for (let j = 0; j < menuList.length; j++) {
          const menuId = menuList[j]?._id;
          allRedeemableMenuId.push(menuId);
        }
      } else {
        allRedeemableMenuId.push(item_id);
      }
    }
    return allRedeemableMenuId.map((item) => (item ? item?.toString() : ""));
  } else {
    for (let i = 0; i < allMenu.length; i++) {
      const menuList = allMenu[i]?.menus;
      for (let j = 0; j < (menuList?.length ?? 0); j++) {
        const menuId = (menuList ?? [])[j]?._id?.toString();
        if (menuId) {
          allRedeemableMenuId.push(menuId);
        }
      }
    }
    return allRedeemableMenuId;
  }
};

const GetMenuByCategoryData = (allMenu: GetAllMenusResponse) =>
  allMenu.map((items) => ({
    key: items.category._id,
    value: items.category._id,
    title: items.category.title,
    children: items.menus.map((menu) => ({
      key: menu._id,
      value: menu._id,
      title: menu.title,
    })),
  }));

const CouponFormCard = styled(Card)`
  flex: 2;
  border: none;
  .ant-card-head {
    padding: 0;
    margin: 0;
    border-bottom: none;
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

const CouponFormContainer = styled(Form<CreateCouponBodyParam>)`
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
