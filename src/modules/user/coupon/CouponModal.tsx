import { H5, Text } from "@/modules/common/components/Typography";
import { session } from "@/modules/user/mock/session";
import { Modal } from "antd";

type CouponModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalType: "headTable" | "changeCoupon";
};

const CouponModal: React.FC<CouponModalProps> = ({
  modalOpen,
  setModalOpen,
  modalType,
}) => {
  const headTableName = session.headTableUser ? session.headTableUser.name : "";

  return (
    <Modal
      title={
        <H5 style={{ marginBottom: "8px" }}>
          {modalType === "headTable"
            ? "ต้องการเป็นเจ้าของบิลแทนหรือไม่"
            : "ใช้คูปองใบนี้แทน?"}
        </H5>
      }
      centered
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
        if (modalType === "headTable") {
          // TODO: change head table by BE
        } else {
          // TODO: Change coupon by BE
        }
      }}
      onCancel={() => setModalOpen(false)}
    >
      <Text>
        {modalType === "headTable"
          ? `คุณต้องการเป็นเจ้าของบิลแทน ${headTableName} หรือไม่โดยคูปองที่ ${headTableName} ใช้ไว้จะถูกคืนแต้มทั้งหมด`
          : "ระบบจะคืนแต้มที่คุณใช้แลกคูปองอันเก่าและใช้งานคูปองใบนี้แทน"}
      </Text>
    </Modal>
  );
};

export default CouponModal;
