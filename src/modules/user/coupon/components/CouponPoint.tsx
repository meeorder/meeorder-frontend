import { H3, H4 } from "@/modules/common/components/Typography";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUserStore } from "@/modules/common/hooks/useUserStore";
import { commaFormat } from "@/modules/common/utils";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { Space, Tag, theme } from "antd";
import { useRouter } from "next/router";

const CouponPoint = () => {
  const {
    token: { colorPrimary, colorPrimaryBgHover },
  } = theme.useToken();

  const { isClientLoaded } = useClient();
  const user = useUserStore((state) => state.user);
  const session = useSessionStore((state) => state.session);

  const router = useRouter();
  const onClickCouponPoint = () => {
    if (!user) {
      void router.push({
        pathname: "/signin",
      });
    }
  };

  const isHeadTable = session?.user?._id === user?._id;

  return (
    <CouponPointContainer color={colorPrimary} onClick={onClickCouponPoint}>
      {isClientLoaded && <UserAvatar user={user} />}

      {isClientLoaded && user ? (
        <Space direction="vertical" size={4}>
          <H4 style={{ color: colorPrimaryBgHover }}>คุณมีแต้มคงเหลือ</H4>
          <FlexRow>
            <H3 style={{ color: "inherit" }}>
              {commaFormat(
                isHeadTable
                  ? (session?.user?.point ?? 0) -
                      (session?.coupon?.required_point ?? 0)
                  : user.point,
              )}
            </H3>
            <H4 style={{ color: "inherit" }}>แต้ม</H4>
          </FlexRow>
        </Space>
      ) : (
        <H3 style={{ color: "inherit" }}>เริ่มเก็บแต้มของคุณ!</H3>
      )}
    </CouponPointContainer>
  );
};

export default CouponPoint;

const CouponPointContainer = styled(Tag)`
  margin-top: 20px;
  margin-inline: auto;
  margin-bottom: 20px;
  padding-inline: 20px;
  padding-block: 12px;
  gap: 16px;

  display: flex;
  width: 300px;
  height: 80px;
  align-items: center;

  border-radius: 16px;
  box-shadow:
    0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12);
`;

const FlexRow = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
`;
