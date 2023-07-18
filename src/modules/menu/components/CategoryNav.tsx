import styled from "@emotion/styled";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";

const CategoryNav = () => {
  const [activeTab, setActiveTab] = useState("Recommend");

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const category = [
    { name: "Recommend" },
    { name: "On Sale" },
    { name: "Drinks" },
    { name: "Sour lover" },
    { name: "Spice up!" },
  ];

  return (
    <CategoryNavContainer>
      <StyledButton
        shape="circle"
        icon={<MagnifyingGlass width={14} height={14} />}
      />
      <TabsContainer>
        <StyledTabs
          onTabClick={(key) => setActiveTab(key)}
          tabBarGutter={20}
          tabPosition="top"
          items={category.map((data) => {
            return {
              label: data.name,
              key: data.name,
            };
          })}
        />
      </TabsContainer>
    </CategoryNavContainer>
  );
};

export default CategoryNav;

const CategoryNavContainer = styled.nav`
  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: flex-start;
`;

const StyledButton = styled(Button)`
  position: absolute;
  height: 32px;
  width: 32px;
  margin: 8px 7px 8px 7px;
  border: none;
  box-shadow: none;
`;

const TabsContainer = styled.div`
  position: relative;
  width: calc(100% - 46px);
  top: 0px;
  left: 46px;

  overflow: hidden;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-more,
  .ant-tabs-nav-operations {
    visibility: hidden;
    display: none;
  }
  margin-left: 8px;
  margin-right: 12px;
`;
