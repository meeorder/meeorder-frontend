import AppLayout from "@/modules/AppLayout";
import CouponFormSectionModal from "@/modules/admin/promotion/console/CouponFormSection";
import CouponDeleteModal from "@/modules/admin/promotion/editCoupon/CouponDeleteModal";
import CouponOverview from "@/modules/admin/promotion/editCoupon/CouponOverview";
import { useState } from "react";

const AdminEditCoupon = () => {
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  return (
    <AppLayout layoutType="admin" currentPageId="adminEditCoupon">
      <CouponOverview
        setOpenModalForm={setModalFormOpen}
        setCouponId={setCouponId}
        setOpenModalDelete={setModalDeleteOpen}
      />
      <CouponFormSectionModal
        key={"CouponFormSectionModal" + couponId}
        openModalForm={modalFormOpen}
        setOpenModalForm={setModalFormOpen}
        couponId={couponId}
        setCouponId={setCouponId}
      />
      <CouponDeleteModal
        key={"CouponDeleteModal" + couponId}
        openDeleteModal={modalDeleteOpen}
        setOpenDeleteModal={setModalDeleteOpen}
        couponId={couponId}
        setCouponId={setCouponId}
      />
    </AppLayout>
  );
};

export default AdminEditCoupon;
