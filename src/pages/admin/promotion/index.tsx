import AppLayout from "@/modules/AppLayout";
import CouponOverview from "@/modules/admin/promotion/CouponOverview";

const AdminPromotion = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminAddEditPromotion">
      <CouponOverview />
    </AppLayout>
  );
};

export default AdminPromotion;
