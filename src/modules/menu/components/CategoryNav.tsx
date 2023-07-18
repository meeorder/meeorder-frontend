import { type Category } from "@/modules/mock/categories";
import styled from "@emotion/styled";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Anchor, Button, ConfigProvider } from "antd";

type CategoryNavProps = {
  categories: readonly Category[];
};

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  return (
    <CategoryNavContainer>
      <StyledButton
        shape="circle"
        icon={<MagnifyingGlass width={14} height={14} />}
      />

      <AnchorContainer>
        <ConfigProvider
          theme={{
            components: {
              Anchor: {
                linkPaddingInlineStart: 40,
              },
            },
          }}
        >
          <StyledAnchor
            direction="horizontal"
            replace={true}
            offsetTop={64}
            targetOffset={64 + 48}
            items={categories.map((category) => {
              return {
                title: category.name,
                key: category.id,
                href: `#${category.id}`,
              };
            })}
          />
        </ConfigProvider>
      </AnchorContainer>
    </CategoryNavContainer>
  );
};

export default CategoryNav;

const CategoryNavContainer = styled.nav`
  height: 48px;
  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: white;
`;

const StyledButton = styled(Button)`
  position: absolute;
  height: 32px;
  width: 32px;
  margin: 8px;
  margin-right: 0;
  border: none;
  box-shadow: none;
`;

const AnchorContainer = styled.div`
  position: relative;
  width: calc(100% - 46px);
  margin-block: auto;
  left: 46px;
  overflow: hidden;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAnchor = styled(Anchor)`
  position: relative;
  margin-right: 16px;
  margin-block: auto;
`;
