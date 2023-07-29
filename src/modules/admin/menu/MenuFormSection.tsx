import { type MenuLayoutVariant } from "@/modules/admin/layout/AdminMenuLayout";
import { H4 } from "@/modules/common/components/Typography";
import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";
import { Card } from "antd";

type MenuFormSectionProps = {
  menuLayoutVariant: MenuLayoutVariant;
};

const MenuFormSection: React.FC<MenuFormSectionProps> = () => {
  return (
    <MenuFormCard title={<H4>MenuForm</H4>} bordered={false}>
      <WireFrame contentNode="AddOnTable" cardColor="red" />
    </MenuFormCard>
  );
};

export default MenuFormSection;

const MenuFormCard = styled(Card)`
  flex: 2;
  padding: 0px 24px 24px 24px;
  .ant-card-head {
    padding: 0;
    height: 64px;
  }
  .ant-card-body {
    padding: 0;
    height: calc(100% - 64px);
  }
`;
