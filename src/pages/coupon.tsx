import CouponDrawerContent from "@/modules/user/coupon/CouponDrawerContent";
import CouponHeader from "@/modules/user/coupon/CouponHeader";
import CouponList from "@/modules/user/coupon/CouponList";
import CouponModal from "@/modules/user/coupon/CouponModal";
import { coupons, type Coupon } from "@/modules/user/mock/coupons";
import { session } from "@/modules/user/mock/session";
import styled from "@emotion/styled";
import { Drawer } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Orders = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"headTable" | "changeCoupon">(
    "changeCoupon",
  );

  const router = useRouter();

  const onClickCoupon = (coupon: Coupon) => {
    setCoupon(coupon);
    setDrawerOpen(true);
  };

  const onClickCouponButton = (coupon: Coupon) => {
    if (!session.user) {
      void router.push({
        // TODO: redirect to signin path
        pathname: "/sign-in",
      });
      return;
    }

    const isHeadTable = session.user === session.headTableUser;
    if (!isHeadTable) {
      setDrawerOpen(false);
      setModalType("headTable");
      setModalOpen(true);
      return;
    }

    const isInUsed = session.coupon === coupon.id;
    const isRedeemable =
      session.user && session.user?.point >= coupon.required_point;
    const hasCouponInUse = !!session.coupon;

    if (isInUsed) {
      // remove coupon
    } else if (isRedeemable && hasCouponInUse) {
      setDrawerOpen(false);
      setModalType("changeCoupon");
      setModalOpen(true);
    } else if (isRedeemable && !hasCouponInUse) {
      // add coupon
      // redirect to orders pages
    }
  };

  return (
    <>
      <Head>
        <title>MeeOrder | Coupon</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CouponHeader />
      <CouponContainer>
        <CouponList
          coupons={coupons}
          onClickCoupon={onClickCoupon}
          onClickCouponButton={onClickCouponButton}
        />
      </CouponContainer>
      <CouponModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
      />
      <Drawer
        placement="bottom"
        closable={false}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <CouponDrawerContent
          coupon={coupon}
          onClickCouponButton={onClickCouponButton}
        />
      </Drawer>
    </>
  );
};

export default Orders;

const CouponContainer = styled.div`
  background-color: ${(props) => props.theme.antd.colorBgBase};
  min-height: calc(100vh - 128px);
  height: 100%;
  padding: 20px;
  padding-top: 180px;
`;
