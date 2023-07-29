import AppLayout from "@/modules/AppLayout";
import { pages } from "@/modules/pageConfig";
import Category from "@/modules/user/menu/components/Category";
import CategoryNav from "@/modules/user/menu/components/CategoryNav";
import { categories } from "@/modules/user/mock/categories";
import { foods } from "@/modules/user/mock/foods";
import styled from "@emotion/styled";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        <CategoryNav categories={categories} />
        <MenuContainer>
          {categories.map((category) => {
            return (
              <Category key={category?.id} category={category} foods={foods} />
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
