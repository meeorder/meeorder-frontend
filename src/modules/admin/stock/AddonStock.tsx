import {
  stockAddonData,
  type StockAddOnDataType,
} from "@/modules/admin/mock/stock";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Card, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

const AddonStock = () => {
  const [dataSource, setDataSource] = useState(stockAddonData);

  const stockAddonColumns: ColumnsType<StockAddOnDataType> = [
    {
      title: "ชื่อท็อปปิ้ง",
      dataIndex: "name",
      key: "name",
      width: "70px",
    },
    {
      title: "เมนูที่ใช้ท็อปปิ้ง",
      dataIndex: "usedInMenu",
      width: "50px",
      align: "end",
    },
    {
      title: "ท็อปปิ้งคงเหลือ",
      dataIndex: "available",
      width: "50px",
      align: "end",
      render: (text: string, rec) => (
        <>
          <Switch
            checked={rec.available}
            onClick={() => {
              console.log(`bruh addon ${rec.id} ${text}`);
              const id = rec.id;
              const value = !rec.available;
              setDataSource((prev) => [
                ...prev.map(function (rec) {
                  //ไม่ชิน arrow function
                  if (rec.id == id) {
                    rec.available = value;
                  }
                  return rec;
                }),
              ]);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <StyledCard
      title={<div>จัดการท็อปปิ้ง</div>}
      extra={
        <CenterContentButton
          type="primary"
          onClick={function () {
            console.log("bruh all addon");
            setDataSource((prev) => [
              ...prev.map(function (rec) {
                rec.available = true;
                return rec;
              }),
            ]);
          }}
        >
          เติมท็อปปิ้งทั้งหมด
        </CenterContentButton>
      }
    >
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={stockAddonColumns}
        scroll={{ y: "70vh", x: "max-content" }}
      />
    </StyledCard>
  );
};

export default AddonStock;

const StyledCard = styled(Card)`
  flex: 1;
  width: 40vw;
`;
