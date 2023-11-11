import CouponList from "@/modules/admin/promotion/editCoupon/CouponList";
import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useRestaurantSetting";
import useUpdateRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useUpdateResturantSetting";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card } from "antd";

type CouponOverviewProps = {
  setOpenModalForm: (open: boolean) => void;
  setCouponId: (data: string) => void;
  setOpenModalDelete: (open: boolean) => void;
};

const CouponOverview: React.FC<CouponOverviewProps> = ({
  setOpenModalForm,
  setCouponId,
  setOpenModalDelete,
}) => {
  const handleAddCoupon = () => {
    setOpenModalForm(true);
  };

  const { data: restaurant } = useRestaurantSetting();
  const { mutate: updateRatio } = useUpdateRestaurantSetting();

  return (
    <CouponOverviewContainer
      title={
        <HeaderContainer>
          <H4
            style={{
              marginLeft: "24px",
              marginTop: "20px",
              marginBottom: "12px",
            }}
          >
            คูปองทั้งหมด
          </H4>
          <Text
            type="secondary"
            style={{
              fontSize: "14px",
              marginLeft: "24px",
              marginBottom: "4px",
            }}
          >
            อัตราส่วนแต้มต่อราคาอาหาร
          </Text>
          <RatioContainer>
            <H4
              editable={{
                onChange: (value) => {
                  const val = parseFloat(value.split(",").join(""));
                  if (val) {
                    updateRatio({ point_ratio: val });
                  }
                },
              }}
              style={{
                marginLeft: "24px",
                marginBottom: "16px",
              }}
            >
              {restaurant?.point_ratio.toLocaleString()}
            </H4>
            <H4
              style={{
                marginBottom: "16px",
              }}
            >
              บาท/ 1 แต้ม
            </H4>
          </RatioContainer>
        </HeaderContainer>
      }
      extra={
        <Button
          style={{
            marginRight: "8px",
            marginTop: "80px",
            marginBottom: "16px",
          }}
          type="primary"
          onClick={() => handleAddCoupon()}
        >
          + เพิ่มคูปอง
        </Button>
      }
    >
      <CouponList
        setCouponId={setCouponId}
        setOpenModalForm={setOpenModalForm}
        setOpenModalDelete={setOpenModalDelete}
      />
    </CouponOverviewContainer>
  );
};

export default CouponOverview;

const CouponOverviewContainer = styled(Card)`
  width: 100%;
  height: 100%;
  .ant-card-head {
    min-height: 52px;
    border-bottom: 0;
  }
  .ant-card-body {
    padding-top: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  width: fit-content;
  position: relative;

  .ant-typography-edit {
    position: absolute;
    right: -32px;
  }
`;
