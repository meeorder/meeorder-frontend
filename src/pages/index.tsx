import AppLayout from "@/modules/AppLayout";
import { pages } from "@/modules/pageConfig";
import Category from "@/modules/user/menu/components/Category";
import CategoryNav from "@/modules/user/menu/components/CategoryNav";
import useAllMenu from "@/modules/user/menu/hooks/useAllMenu";
import useCategories from "@/modules/user/menu/hooks/useCategory";
import styled from "@emotion/styled";
import Head from "next/head";

const Home = () => {
  const allMenu = useAllMenu();
  const categories = useCategories();

  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        <CategoryNav
          categories={categories?.data?.sort((a, b) => a.rank - b.rank) ?? []}
        />
        <MenuContainer>
          {allMenu?.data
            ?.sort((a, b) => a?.category?.rank - b?.category?.rank)
            ?.map((item) => {
              return (
                <Category
                  key={item?.category?._id}
                  category={item?.category}
                  menus={item?.menus}
                />
              );
            })}
        </MenuContainer>
      </AppLayout>
    </>
  );
};

export default Home;

const MenuContainer = styled.div`
  background-color: ${(props) => props.theme.antd.colorBgBase};
  min-height: calc(100vh - 128px);
  height: 100%;
  padding-inline: 20px;
  padding-top: 48px;
`;
