import CatergoryList from "@/modules/admin/menu/console/CategoryList";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Card } from "antd";

const CategoryOverview = () => {
  return (
    <CategoryOverviewCard>
      <H4>Category</H4>
      <CatergoryList />
    </CategoryOverviewCard>
  )
};

export default CategoryOverview;
const CategoryOverviewCard = styled(Card)`
  width: 100%;
  height: 100%;
  h4{
    margin-bottom: 12px;
  }
`