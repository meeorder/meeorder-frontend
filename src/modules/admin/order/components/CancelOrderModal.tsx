import useUpdateOrderStatusToCancel from "@/modules/admin/order/hook/useUpdateOrderStatusToCancel";
import { H5, Text } from "@/modules/common/components/Typography";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { orderStatusTranslation } from "@/pages/admin/order-management";
import { SettingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Input,
  Menu,
  Modal,
  Tag,
  theme,
  type MenuProps,
} from "antd";
import React, { useState } from "react";

const { CheckableTag } = Tag;
const { TextArea } = Input;
type CancelOrderModalProps = {
  setIsModalOpen: (value: boolean) => void;
  isCancelModalOpen: boolean;
  setIsCancelModalOpen: (value: boolean) => void;
  modalData?: GetAllOrdersResponse[number];
};
const items: MenuProps["items"] = [
  {
    label: "วัตถุดิบหมด",
    key: "outOfStock",
    icon: <SettingOutlined />,
  },
  {
    label: "สาเหตุอื่นๆ",
    key: "other",
    icon: <SettingOutlined />,
  },
];

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  setIsModalOpen,
  isCancelModalOpen,
  setIsCancelModalOpen,
  modalData,
}) => {
  const { token } = theme.useToken();
  const textColor = {
    IN_QUEUE: token["orange-6"],
    PREPARING: token["geekblue-6"],
    READY_TO_SERVE: token["blue-6"],
    DONE: token["green-6"],
    CANCELLED: token["red-6"],
  };
  const tagsData = [
    "ลูกค้าปฏิเสธรับอาหาร",
    "ขาดวัตถุดิบอื่นๆ",
    "ร้านใกล้ปิดบริการ",
    "ขาดรายละเอียดอาหาร",
  ];
  const { mutate: updateOrderStatusToCancel } = useUpdateOrderStatusToCancel();
  const [cancelReasonMode, setCancelReasonMode] =
    useState<string>("outOfStock");
  const [cancelReasonDetail, setCancelReasonDetail] = useState<string[]>([]);
  const [IngredientDetail, setIngredientDetail] = useState<string[]>([]);
  const [AddOnsDetail, setAddOnsDetail] = useState<string[]>([]);
  const [OptionalDetail, setOptionalDetail] = useState<string>("");
  const handleBackToOrderModal = () => {
    setIsCancelModalOpen(false);
    setIsModalOpen(true);
    setCancelReasonDetail([]);
    setIngredientDetail([]);
    setAddOnsDetail([]);
    setOptionalDetail("");
  };
  const handelChangeCancelReasonMode: MenuProps["onClick"] = (e) => {
    setCancelReasonMode(e?.key);
    setCancelReasonDetail([]);
    setIngredientDetail([]);
    setAddOnsDetail([]);
    setOptionalDetail("");
  };
  const handleChangeAnotherReason = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...cancelReasonDetail, tag]
      : cancelReasonDetail.filter((t) => t !== tag);
    setCancelReasonDetail(nextSelectedTags);
  };
  const handleChangeAddOnsDetail = (tag: string, checked: boolean) => {
    console.log(tag, checked);
    const nextSelectedTags = checked
      ? [...AddOnsDetail, tag]
      : AddOnsDetail.filter((t) => t !== tag);
    setAddOnsDetail(nextSelectedTags);
  };
  const handleChangeInrgedient = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...IngredientDetail, tag]
      : IngredientDetail.filter((t) => t !== tag);
    setIngredientDetail(nextSelectedTags);
  };
  const handleChangeOptionalDetail = (value: string) => {
    setOptionalDetail(value);
  };
  const handleCancelOrder = (id: string) => {
    updateOrderStatusToCancel({
      id: id,
      ingredients: IngredientDetail,
      addons: AddOnsDetail,
      reasons: OptionalDetail
        ? [...cancelReasonDetail, OptionalDetail]
        : cancelReasonDetail,
    }||{});
    setIsCancelModalOpen(false);
    setCancelReasonDetail([]);
    setIngredientDetail([]);
    setAddOnsDetail([]);
    setOptionalDetail("");
  };
  return (
    <StyledModal
      title={
        <ModalTitle color={textColor[modalData?.status ?? "IN_QUEUE"]}>
          สถานะ: {orderStatusTranslation[modalData?.status ?? "DONE"]}
        </ModalTitle>
      }
      open={isCancelModalOpen}
      footer={false}
      closeIcon={false}
      centered={true}
      width={"50%"}
      onCancel={() => {
        setIsCancelModalOpen(false);
        setCancelReasonDetail([]);
        setIngredientDetail([]);
        setAddOnsDetail([]);
        setOptionalDetail("");
      }}
    >
      <ModalContainer>
        <LeftContainer>
          <OrderInfo>
            <H5>{modalData?.menu.title}</H5>
            {modalData?.addons && (
              <ul style={{ margin: "0" }}>
                {modalData?.addons.map((addon) => {
                  return <li key={addon._id}>{addon.title}</li>;
                })}
              </ul>
            )}
            {modalData?.additional_info && (
              <AddInfo ellipsis={true}>
                Note: {modalData?.additional_info}
              </AddInfo>
            )}
          </OrderInfo>
          <StyledDivider type="vertical" />
        </LeftContainer>
        <CancelReasonContainer>
          <StyledMenu
            style={{ minWidth: 0, flex: "auto" }}
            onClick={handelChangeCancelReasonMode}
            selectedKeys={[cancelReasonMode]}
            mode="horizontal"
            items={items}
          />
          {cancelReasonMode === "outOfStock" && (
            <MainReasoncontainer>
              {modalData?.menu.ingredients.length != 0 && (
                <IngredientReasonContainer>
                  <H5>วัตถุดิบหลักหมด:</H5>
                  <OutOfStockCheckableGroup>
                    {modalData?.menu.ingredients.map((ingredient) => (
                      <StyledCheckableTag
                        key={ingredient._id}
                        checked={IngredientDetail.includes(ingredient._id)}
                        onChange={(checked) =>
                          handleChangeInrgedient(ingredient._id, checked)
                        }
                      >
                        {<H5>{ingredient.title}</H5>}
                      </StyledCheckableTag>
                    ))}
                  </OutOfStockCheckableGroup>
                </IngredientReasonContainer>
              )}
              {modalData?.addons.length != 0 && (
                <IngredientReasonContainer>
                  <H5>ท๊อปปิ้งหมด:</H5>
                  <OutOfStockCheckableGroup>
                    {modalData?.addons.map((addon) => (
                      <StyledCheckableTag
                        key={addon._id}
                        checked={AddOnsDetail.includes(addon._id)}
                        onChange={(checked) =>
                          handleChangeAddOnsDetail(addon._id, checked)
                        }
                      >
                        {<H5>{addon.title}</H5>}
                      </StyledCheckableTag>
                    ))}
                  </OutOfStockCheckableGroup>
                </IngredientReasonContainer>
              )}
            </MainReasoncontainer>
          )}
          {cancelReasonMode === "other" && (
            <OtherReasonContainer>
              <H5>ระบุสาเหตุเพื่อยกเลิกรายการนี้:</H5>
              <CheckableGroup>
                {tagsData.map((tag) => (
                  <StyledCheckableTag
                    key={tag}
                    checked={cancelReasonDetail.includes(tag)}
                    onChange={(checked) =>
                      handleChangeAnotherReason(tag, checked)
                    }
                  >
                    <H5>{tag}</H5>
                  </StyledCheckableTag>
                ))}
              </CheckableGroup>

              <TextArea
                showCount
                maxLength={100}
                placeholder="ระบุสาเหตุอื่นๆ"
                style={{ height: 40, marginBottom: 24 }}
                value={OptionalDetail}
                onChange={(value) =>
                  handleChangeOptionalDetail(value.target.value)
                }
              />
            </OtherReasonContainer>
          )}

          <ButtonContainer>
            <StyledButton onClick={handleBackToOrderModal}>
              ย้อนกลับ
            </StyledButton>
            <StyledButton
              type="primary"
              danger
              onClick={() => handleCancelOrder(modalData?._id || "")}
            >
              ยกเลิกออเดอร์นี้
            </StyledButton>
          </ButtonContainer>
        </CancelReasonContainer>
      </ModalContainer>
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;
const ModalTitle = styled.div`
  color: ${(props) => props.color} !important;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;

const StyledMenu = styled(Menu)`
  .ant-menu-item-selected {
    color: ${(props) => props.theme.antd["red-6"]} !important;
  }
  .ant-menu-item-selected::after {
    border-bottom-color: ${(props) => props.theme.antd["red-6"]} !important;
  }
  .ant-menu-item {
    align-self: stretch;
    text-align: center;
    width: 50%;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledDivider = styled(Divider)`
  height: 100%;
  margin-right: 24px;
  margin-left: 24px;
`;
const CancelReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
`;

const AddInfo = styled(Text)`
  width: 10vw;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  bottom: 0;
`;
const MainReasoncontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const IngredientReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
`;

const OtherReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CheckableGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  width: 70%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledCheckableTag = styled(CheckableTag)`
  border: 1px solid
    ${(props) =>
      props.checked ? props.theme.antd["red-3"] : props.theme.antd.colorBorder};
  background-color: ${(props) =>
    props.checked
      ? props.theme.antd["red-1"]
      : props.theme.antd.colorBgLayout} !important;
  border-radius: 4px;
  .ant-typography {
    color: ${(props) =>
      props.checked ? props.theme.antd["red-6"] : props.theme.antd.colorText};
  }
  margin: 0;
`;

const OutOfStockCheckableGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
`;
export default CancelOrderModal;
