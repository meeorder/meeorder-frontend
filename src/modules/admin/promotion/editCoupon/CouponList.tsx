import useAllCoupon from "@/modules/admin/promotion/hook/useAllCoupon";
import { Text } from "@/modules/common/components/Typography";
import { type GetAllCouponsResponse } from "@/modules/services/coupons";
import styled from "@emotion/styled";
import { Progress, Table, Typography } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

type TableRowProps = GetAllCouponsResponse[number];

type CouponListProps = {
  setCouponId: (data: string) => void;
  setOpenModalForm: (open: boolean) => void;
  setOpenModalDelete: (open: boolean) => void;
};

const CouponList: React.FC<CouponListProps> = ({
  setCouponId,
  setOpenModalForm,
  setOpenModalDelete,
}) => {
  const { data: allCoupons } = useAllCoupon();
  const [dataSource, setDataSource] = useState<TableRowProps[]>([]);

  useEffect(() => {
    setDataSource(allCoupons ?? []);
  }, [allCoupons]);

  const handleEdit = (_id: string) => {
    setCouponId(_id);
    setOpenModalForm(true);
  };

  const handleDelete = (_id: string) => {
    setCouponId(_id);
    setOpenModalDelete(true);
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
      sorter: (a, b) => b.discount - a.discount,
    },
    {
      key: "required_point",
      title: "แต้มที่ต้องใช้",
      dataIndex: "required_point",
      width: "12%",
      align: "right",
      sorter: (a, b) => b.required_point - a.required_point,
    },
    {
      key: "required_menus",
      title: "เมนูที่ใช้คูปองได้",
      dataIndex: "required_menus",
      width: "10%",
      align: "right",
      sorter: (a, b) => b.required_menus.length - a.required_menus.length,
      render: (required_menus: string[]) => {
        return <Text>{required_menus.length ?? 0}</Text>;
      },
    },
    {
      key: "quota",
      title: "จำนวนคูปอง",
      dataIndex: "quota",
      width: "10%",
      align: "right",
      sorter: (a, b) => b.quota - a.quota,
    },
    {
      key: "percentOfUsedCoupons",
      title: "เปอร์เซ็นต์การใช้คูปอง",
      width: "17%",
      sorter: (a, b) => {
        const percentOfUsedCouponsA = (a.redeemed / a.quota) * 100;
        const percentOfUsedCouponsB = (b.redeemed / b.quota) * 100;
        return percentOfUsedCouponsB - percentOfUsedCouponsA;
      },
      render: (_, record) => {
        const { quota, redeemed } = record;
        const percentOfUsedCoupons = (redeemed / quota) * 100;
        return (
          <ProgressTextContainer>
            <ProgressContainer>
              <Progress percent={percentOfUsedCoupons} showInfo={false} />
            </ProgressContainer>
            {Number.isNaN(percentOfUsedCoupons) ? (
              <Text>0%</Text>
            ) : (
              <Text>{percentOfUsedCoupons.toFixed(0)}%</Text>
            )}
          </ProgressTextContainer>
        );
      },
    },
    {
      key: "activated",
      title: "สถานะ",
      dataIndex: "activated",
      width: "8%",
      sorter: (a, b) => +b.activated - +a.activated,
      render: (activated: boolean) => {
        return (
          <>
            <DotStatus activated={activated} />
            <Text>{activated ? "เผยแพร่" : "ฉบับร่าง"}</Text>
          </>
        );
      },
    },
    {
      key: "action",
      title: "ดำเนินการ",
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
        scroll={{ y: "calc(100vh - 320px)" }}
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

const DotStatus = styled.span<{ activated: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${(props) => (props.activated ? "#52c41a" : "#d9d9d9")};
  margin-right: 8px;
`;

const ScrollAuto = styled.div`
  .ant-table-body {
    overflow-y: auto !important;
    height: calc(90vh - 240px);
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
