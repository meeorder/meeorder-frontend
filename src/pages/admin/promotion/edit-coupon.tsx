import AppLayout from "@/modules/AppLayout";
import CouponFormSectionModal from "@/modules/admin/promotion/console/CouponFormSection";
import CouponOverview from "@/modules/admin/promotion/editCoupon/CouponOverview";
import { useState } from "react";

const AdminEditCoupon = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <AppLayout layoutType="admin" currentPageId="adminEditCoupon">
      <CouponOverview openModal={formOpen} setOpenModal={setFormOpen} />
      <CouponFormSectionModal openModal={formOpen} setOpenModal={setFormOpen} />
    </AppLayout>
  );
};

export default AdminEditCoupon;
