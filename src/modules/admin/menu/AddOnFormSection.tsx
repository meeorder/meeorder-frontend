import { type MenuLayoutVariant } from "@/modules/admin/layout/AdminMenuLayout";
import { addOnData, columns } from "@/modules/admin/mock/addon";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card, Table } from "antd";

type AddOnFormSectionProps = {
  menuLayoutVariant: MenuLayoutVariant;
};

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
