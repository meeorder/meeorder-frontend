import { H5, Text } from "@/modules/common/components/Typography";
import { useSetSessionUser } from "@/modules/common/hooks/useSetSessionUser";
import { useAllUsableCouponsInSession } from "@/modules/user/coupon/hooks/useAllUsableCouponsInSession";
import { useUpdateCouponInSession } from "@/modules/user/coupon/hooks/useUpdateCouponInSession";
import { type Coupon } from "@/modules/user/coupon/types";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import { Modal } from "antd";

type CouponModalProps = {
  coupon?: Coupon;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalType: "changeHeadTable" | "changeCoupon";
};

const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  modalOpen,
  setModalOpen,
  modalType,
}) => {
  const session = useSessionStore((state) => state.session);
  const { mutate: setSessionUser } = useSetSessionUser(true);
  const { refetch: refetchCoupons } = useAllUsableCouponsInSession();
  const { mutate: updateCouponInSession } = useUpdateCouponInSession();

  const headTableName = session?.user?.username ?? "";

  return (
    <Modal
      title={
        <H5 style={{ marginBottom: "8px" }}>
          {modalType === "changeHeadTable"
            ? "ต้องการเป็นเจ้าของบิลแทนหรือไม่"
            : "ใช้คูปองใบนี้แทน?"}
        </H5>
      }
      centered
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
        if (modalType === "changeHeadTable") {
          setSessionUser();
          void refetchCoupons();
        } else if (coupon) {
          updateCouponInSession({ coupon_id: coupon?._id });
        }
      }}
      onCancel={() => setModalOpen(false)}
      okText="ยืนยัน"
      cancelText="ยกเลิก"
    >
      <Text>
        {modalType === "changeHeadTable"
          ? `คุณต้องการเป็นเจ้าของบิลแทน ${headTableName} หรือไม่โดยคูปองที่ ${headTableName} ใช้ไว้จะถูกคืนแต้มทั้งหมด`
          : "ระบบจะคืนแต้มที่คุณใช้แลกคูปองอันเก่าและใช้งานคูปองใบนี้แทน"}
      </Text>
    </Modal>
  );
};

export default CouponModal;
