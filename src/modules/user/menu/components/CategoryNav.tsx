import { type Category } from "@/modules/user/menu/types";
import styled from "@emotion/styled";
import { Anchor, ConfigProvider } from "antd";

type CategoryNavProps = {
  categories: Category[];
};

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  return (
    <CategoryNavContainer>
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
            replace
            offsetTop={64}
            targetOffset={64 + 48}
            items={categories?.map((category) => {
              return {
                title: category.title,
                key: category._id,
                href: `#${category._id}`,
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
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 64px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.antd.colorBgBase};
`;

const AnchorContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-block: auto;
  overflow: hidden;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAnchor = styled(Anchor)`
  position: fixed;
  top: 64px;
  margin: 0 auto;
  width: calc(100% - 40px);
  max-width: calc(500px - 40px);
  .ant-anchor {
    padding: 0 10px;
  }
`;
