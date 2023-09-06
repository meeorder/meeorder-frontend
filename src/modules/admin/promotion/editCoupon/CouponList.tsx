import { couponData } from "@/modules/admin/mock/coupon";
import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Progress, Table, Typography } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

interface TableRowProps {
  _id: string;
  title: string;
  discount: number;
  point: number;
  numberOfMenusCanUse: number;
  numberOfCoupons: number;
  percentOfUsedCoupons: number;
  status: boolean;
}

type CouponListProps = {
  setCouponId: (data: string) => void;
  setOpenModal: (open: boolean) => void;
};

const CouponList: React.FC<CouponListProps> = ({
  setCouponId,
  setOpenModal,
}) => {
  const [dataSource, setDataSource] = useState(
    couponData.map((coupon) => ({
      _id: coupon._id,
      title: coupon.title,
      discount: coupon.discount,
      point: coupon.point,
      numberOfMenusCanUse: coupon.redeemableMenu.length,
      numberOfCoupons: coupon.numberOfCoupons,
      percentOfUsedCoupons:
        (coupon.numberOfReadeamedCoupons / coupon.numberOfCoupons) * 100,
      status: coupon.status,
    })),
  );

  const handleEdit = (_id: string) => {
    const coupon = couponData.find((coupon) => coupon._id === _id);
    setCouponId(_id);
    setOpenModal(true);
    console.log("Edit", coupon);
  };

  const handleDelete = (_id: string) => {
    setDataSource((prev) => [...prev.filter((coupon) => coupon._id !== _id)]);
  };

  const columns: ColumnsType<TableRowProps> = [
    {
      key: "title",
      title: "ชื่อคูปอง",
      dataIndex: "title",
    },
    {
      key: "discount",
      title: "ส่วนลด",
      dataIndex: "discount",
      width: "7%",
      align: "right",
    },
    {
      key: "point",
      title: "แต้มที่ต้องใช้",
      dataIndex: "point",
      width: "8%",
      align: "right",
    },
    {
      key: "numberOfMenusCanUse",
      title: "เมนูที่ใช้คูปองได้",
      dataIndex: "numberOfMenusCanUse",
      width: "10%",
      align: "right",
    },
    {
      key: "numberOfCoupons",
      title: "จำนวนคูปอง",
      dataIndex: "numberOfCoupons",
      width: "10%",
      align: "right",
    },
    {
      key: "percentOfUsedCoupons",
      title: "เปอร์เซ็นต์การใช้คูปอง",
      dataIndex: "percentOfUsedCoupons",
      width: "17%",
      render: (percentOfUsedCoupons: number) => {
        return (
          <ProgressTextContainer>
            <ProgressContainer>
              <Progress percent={percentOfUsedCoupons} showInfo={false} />
            </ProgressContainer>
            <Text>{percentOfUsedCoupons.toFixed(0)}%</Text>
          </ProgressTextContainer>
        );
      },
    },
    {
      key: "status",
      title: "สถานะ",
      dataIndex: "status",
      width: "8%",
      render: (status: boolean) => {
        return (
          <>
            <DotStatus status={status} />
            <Text>{status ? "เผยแพร่" : "ฉบับร่าง"}</Text>
          </>
        );
      },
    },
    {
      key: "action",
      title: "ดำเนินการ",
      dataIndex: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <StyledDiv>
            <Typography.Link key="edit" onClick={() => handleEdit(record._id)}>
              แก้ไข
            </Typography.Link>
            <Typography.Link
              key="delete"
              onClick={() => handleDelete(record._id)}
            >
              ลบ
            </Typography.Link>
          </StyledDiv>
        );
      },
    },
  ];

  return (
    <ScrollAuto>
      <Table
        pagination={false}
        scroll={{ y: "76vh" }}
        style={{ width: "99%" }}
        rowKey={"_id"}
        dataSource={dataSource}
        columns={columns}
      />
    </ScrollAuto>
  );
};
export default CouponList;

const StyledDiv = styled.div`
  display: flex;
  gap: 16px;
`;

const DotStatus = styled.span<{ status: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${(props) => (props.status ? "#52c41a" : "#d9d9d9")};
  margin-right: 8px;
`;

const ScrollAuto = styled.div`
  .ant-table-body {
    overflow-y: auto !important;
  }
`;

const ProgressTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressContainer = styled.div`
  width: 80%;
`;