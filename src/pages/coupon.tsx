import { useUser } from "@/modules/common/hooks/useUserStore";
import CouponDrawerContent from "@/modules/user/coupon/components/CouponDrawerContent";
import CouponHeader from "@/modules/user/coupon/components/CouponHeader";
import CouponList from "@/modules/user/coupon/components/CouponList";
import CouponModal from "@/modules/user/coupon/components/CouponModal";
import { useUpdateCouponInSession } from "@/modules/user/coupon/hooks/useUpdateCouponInSession";
import { type Coupon } from "@/modules/user/coupon/types";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { Button, Drawer } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Orders = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "changeHeadTable" | "changeCoupon"
  >("changeCoupon");

  const router = useRouter();

  const { data: session } = useSession();
  const { data: user } = useUser();
  const { mutate: updateCouponInSession } = useUpdateCouponInSession();

  const onClickCoupon = (coupon: Coupon) => {
    if (!session) return;

    setCoupon(coupon);
    setDrawerOpen(true);
  };

  const onClickCouponButton = (coupon: Coupon) => {
    if (!session) return;

    setCoupon(coupon);
    if (!user) {
      void router.push({
        pathname: "/signin",
      });
      return;
    }

    const isHeadTable = user?._id === session?.user?._id;
    if (!isHeadTable) {
      setDrawerOpen(false);
      setModalType("changeHeadTable");
      setModalOpen(true);
      return;
    }

    const isInUsed = coupon._id === session?.coupon?._id;
    const isRedeemable = coupon.redeemable;
    const hasCouponInUse = !!session?.coupon;

    if (isInUsed) {
      updateCouponInSession({ coupon_id: null });
    } else if (isRedeemable && hasCouponInUse) {
      setDrawerOpen(false);
      setModalType("changeCoupon");
      setModalOpen(true);
    } else if (isRedeemable && !hasCouponInUse) {
      updateCouponInSession({ coupon_id: coupon._id });
    }
  };

  const onClickChangeHeadTable = () => {
    if (!session) return;

    if (!user) {
      void router.push({
        pathname: "/signin",
      });
      return;
    }

    const isHeadTable = user?._id === session?.user?._id;
    if (!isHeadTable) {
      setDrawerOpen(false);
      setModalType("changeHeadTable");
      setModalOpen(true);
      return;
    }
  };

  return (
    <CouponLayoutContainer>
      <Head>
        <title>MeeOrder | Coupon</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CouponHeader />
      <CouponContainer>
        {user?._id !== session?.user?._id && (
          <Button
            type="link"
            style={{
              marginBottom: "10px",
            }}
            onClick={onClickChangeHeadTable}
          >
            คุณยังไม่ได้เป็นหัวโต๊ะ ต้องการเป็นหัวโต๊ะและสะสมแต้มของคุณ?
          </Button>
        )}
        <CouponList
          onClickCoupon={onClickCoupon}
          onClickCouponButton={onClickCouponButton}
        />
      </CouponContainer>
      <CouponModal
        coupon={coupon}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
      />

      <Drawer
        placement="bottom"
        closable={false}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        contentWrapperStyle={{
          maxWidth: "500px",
          margin: "0 auto",
          borderRadius: "20px",
        }}
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        <CouponDrawerContent
          coupon={coupon}
          onClickCouponButton={onClickCouponButton}
        />
      </Drawer>
    </CouponLayoutContainer>
  );
};

export default Orders;

const CouponLayoutContainer = styled.div`
  min-height: 100dvh;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fafafa;
`;

const CouponContainer = styled.div`
  text-align: center;
  min-height: calc(100dvh - 128px);
  overflow: hidden;
  height: 100%;
  padding: 20px;
  padding-top: 180px;
`;
