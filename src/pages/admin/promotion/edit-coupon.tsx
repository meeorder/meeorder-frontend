import AppLayout from "@/modules/AppLayout";
import CouponOverview from "@/modules/admin/promotion/CouponOverview";

const AdminEditCoupon = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminEditCoupon">
      <CouponOverview />
    </AppLayout>
  );
};

export default AdminEditCoupon;
