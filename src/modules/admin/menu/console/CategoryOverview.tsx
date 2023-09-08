import CategoryList from "@/modules/admin/menu/console/CategoryList";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card } from "antd";

const CategoryOverview = () => {
  return (
    <CategoryOverviewCard
      title={<H4>หมวดหมู่</H4>}
      extra={<Button type="primary">เพิ่มหมวดหมู่</Button>}
    >
      <CategoryList />
    </CategoryOverviewCard>
  );
};

export default CategoryOverview;
const CategoryOverviewCard = styled(Card)`
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
