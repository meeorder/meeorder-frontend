import CouponList from "@/modules/admin/promotion/editCoupon/CouponList";
import { H4 } from "@/modules/common/components/Typography";
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

  return (
    <CouponOverviewConatiner
      title={
        <H4
          style={{
            marginLeft: "24px",
            marginTop: "20px",
            marginBottom: "16px",
          }}
        >
          คูปอง
        </H4>
      }
      extra={
        <Button
          style={{
            marginRight: "24px",
            marginTop: "20px",
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
    </CouponOverviewConatiner>
  );
};

export default CouponOverview;

const CouponOverviewConatiner = styled(Card)`
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
