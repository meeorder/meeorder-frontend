import AppLayout from "@/modules/AppLayout";
import CouponFormSectionModal from "@/modules/admin/promotion/console/CouponFormSection";
import CouponOverview from "@/modules/admin/promotion/editCoupon/CouponOverview";
import { useState } from "react";

const AdminEditCoupon = () => {
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  return (
    <AppLayout layoutType="admin" currentPageId="adminEditCoupon">
      <CouponOverview
        setOpenModal={setModalFormOpen}
        setCouponId={setCouponId}
      />
      <CouponFormSectionModal
        openModal={modalFormOpen}
        setOpenModal={setModalFormOpen}
        couponId={couponId}
        setCouponId={setCouponId}
      />
    </AppLayout>
  );
};

export default AdminEditCoupon;
