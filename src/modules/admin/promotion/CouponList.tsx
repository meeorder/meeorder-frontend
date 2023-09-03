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
  status: "published" | "draft";
}

const CouponList = () => {
  const [dataSource, setDataSource] = useState(
    couponData.map((coupon) => ({
      _id: coupon._id,
      title: coupon.title,
      discount: coupon.discount,
      point: coupon.point,
      numberOfMenusCanUse: coupon.useableMenu.length,
      numberOfCoupons: coupon.numberOfCoupons,
      percentOfUsedCoupons:
        (coupon.numberOfUsedCoupons / coupon.numberOfCoupons) * 100,
      status: coupon.status,
    })),
  );

  // const onChange = (value: string, _id: string) => {
  //   setDataSource((prev) => [
  //     ...prev.map((coupon) =>
  //       coupon._id === _id ? { ...coupon, title: value } : coupon,
  //     ),
  //   ]);
  // };

  // const onConfirm = (_id: string) => {
  //   setDataSource((prev) => [...prev.filter((coupon) => coupon._id !== _id)]); // TODO: update to api
  // };

  const columns: ColumnsType<TableRowProps> = [
    {
      key: "title",
      title: "ชื่อคูปอง",
      dataIndex: "title",
      width: "25%",
    },
    {
      key: "discount",
      title: "ส่วนลด",
      dataIndex: "discount",
      width: "7%",
    },
    {
      key: "point",
      title: "แต้มที่ต้องใช้",
      dataIndex: "point",
      width: "8%",
    },
    {
      key: "numberOfMenusCanUse",
      title: "เมนูที่ใช้คูปองได้",
      dataIndex: "numberOfMenusCanUse",
      width: "10%",
    },
    {
      key: "numberOfCoupons",
      title: "จำนวนคูปอง",
      dataIndex: "numberOfCoupons",
      width: "10%",
    },
    {
      key: "percentOfUsedCoupons",
      title: "เปอร์เซ็นต์การใช้คูปอง",
      dataIndex: "percentOfUsedCoupons",
      width: "17%",
      render: (percentOfUsedCoupons: number) => {
        return <Progress percent={percentOfUsedCoupons} />;
      },
    },
    {
      key: "status",
      title: "สถานะ",
      dataIndex: "status",
      width: "8%",
      render: (status: "published" | "draft") => {
        return (
          <>
            <DotStatus status={status} />
            <Text>{status === "published" ? "เผยแพร่" : "ฉบับร่าง"}</Text>
          </>
        );
      },
    },
    {
      key: "action",
      title: "ดำเนินการ",
      dataIndex: "action",
      width: "15%",
      render: (_, record) => {
        return (
          <StyledDiv>
            <Typography.Link key="edit">แก้ไข</Typography.Link>
            <Typography.Link key="delete">ลบ</Typography.Link>
          </StyledDiv>
        );
      },
    },
  ];

  return (
    <Table
      pagination={false}
      scroll={{ y: "76vh" }}
      style={{ width: "99%" }}
      rowKey={"_id"}
      dataSource={dataSource}
      columns={columns}
    />
  );
};
export default CouponList;

const StyledDiv = styled.div`
  display: flex;
  gap: 16px;
`;

const DotStatus = styled.span<{ status: "published" | "draft" }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${(props) =>
    props.status === "published" ? "#52c41a" : "#d9d9d9"};
  margin-right: 8px;
`;
