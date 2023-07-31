import { type MenuLayoutVariant } from "@/modules/admin/layout/AdminMenuLayout";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

type AddOnFormSectionProps = {
  menuLayoutVariant: MenuLayoutVariant;
};
type AddOnDataType = {
  id: string;
  title: string;
  price: string;
};
const columns: ColumnsType<AddOnDataType> = [
  {
    title: "Add-On Name",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "100px",
  },
];

const addOnData: AddOnDataType[] = [
  {
    title: "Add-On 1",
    price: "100",
    id: "1",
  },
  {
    title: "Add-On 2",
    price: "200",
    id: "2",
  },
  {
    id: "3",
    title: "Add-On 3",
    price: "300",
  },
  {
    id: "4",
    title: "Add-On 4",
    price: "400",
  },
  {
    id: "5",
    title: "Add-On 5",
    price: "500",
  },
  {
    id: "6",
    title: "Add-On 6",
    price: "600",
  },
  {
    id: "7",
    title: "Add-On 7",
    price: "700",
  },
];

const AddOnFormSection: React.FC<AddOnFormSectionProps> = () => {
  return (
    <AddOnFormCard
      title={<H4>Add-on</H4>}
      bordered={false}
      extra={<Button type="primary">Edit</Button>}
    >
      <Table
        columns={columns}
        dataSource={addOnData}
        scroll={{ y: "20vh", x: "max-content" }}
        pagination={false}
        style={{ width: "99%" }}
        rowKey={(record) => record.id}
      />
    </AddOnFormCard>
  );
};

export default AddOnFormSection;

const AddOnFormCard = styled(Card)`
  flex: 1;
  padding: 0px 24px 24px 24px;
  .ant-card-head {
    padding: 0;
    height: 64px;
  }
  .ant-card-body {
    padding: 0;
    margin: 0;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
`;
