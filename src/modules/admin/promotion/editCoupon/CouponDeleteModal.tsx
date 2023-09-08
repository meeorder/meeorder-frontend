import useDeleteCoupon from "@/modules/admin/promotion/hook/useDeleteCoupon";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Modal, Result } from "antd";

type CouponDeleteModalProps = {
  couponId: string;
  setCouponId: (id: string) => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: (visible: boolean) => void;
};

const CouponDeleteModal: React.FC<CouponDeleteModalProps> = ({
  couponId,
  setCouponId,
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const { mutate: deleteCoupon } = useDeleteCoupon();

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    deleteCoupon({ id: couponId });
    setCouponId("");
    setOpenDeleteModal(false);
  };

  return (
    <StyledModal
      centered
      closable={false}
      maskClosable={false}
      open={openDeleteModal}
      onOk={handleDelete}
      onCancel={handleCancel}
      cancelText="ยกเลิก"
      okText="ลบ"
      okButtonProps={{ danger: true }}
    >
      <Result
        status="warning"
        title={
          <H4 style={{ paddingBottom: "12px" }}>คุณต้องการจะลบคูปองหรือไม่?</H4>
        }
        style={{ paddingBottom: "0px", paddingTop: "0px" }}
      />
    </StyledModal>
  );
};

export default CouponDeleteModal;

const StyledModal = styled(Modal)`
  padding-top: 20px !important;
  .ant-modal-footer {
    display: flex;
    justify-content: center;
  }
`;
