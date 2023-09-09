import CatergoryList from "@/modules/admin/menu/console/CategoryList";
import useCreateCategory from "@/modules/admin/menu/hooks/useCreateCategory";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card } from "antd";

const CategoryOverview = () => {
  const { mutate: createCategory } = useCreateCategory();

  const onCreate = () => {
    createCategory({ title: "หมวดหมู่ใหม่" });
  };
  return (
    <CategoryOverviewCard
      title={<H4>หมวดหมู่</H4>}
      extra={
        <Button type="primary" onClick={onCreate}>
          เพิ่มหมวดหมู่
        </Button>
      }
    >
      <CatergoryList />
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
