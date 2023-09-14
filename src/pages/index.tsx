import AppLayout from "@/modules/AppLayout";
import { useSetSessionUser } from "@/modules/common/hooks/useSetSessionUser";
import { pages } from "@/modules/pageConfig";
import Category from "@/modules/user/menu/components/Category";
import CategoryNav from "@/modules/user/menu/components/CategoryNav";
import useAllMenu from "@/modules/user/menu/hooks/useAllMenu";
import useCategories from "@/modules/user/menu/hooks/useCategory";
import { useSetNewSessionBySessionId } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const allMenu = useAllMenu();
  const categories = useCategories();
  const [sessionId, setSessionId] = useState<string>("");
  useSetNewSessionBySessionId(sessionId, true);
  const { mutate: setSessionUser } = useSetSessionUser();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const sessionId = router.query["session-id"];
    if (typeof sessionId === "string") {
      setSessionId(sessionId);
    }
  }, [router]);

  useEffect(() => {
    setSessionUser();
  }, [setSessionUser]);

  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        <CategoryNav categories={categories?.data ?? []} />
        <MenuContainer>
          {allMenu?.data
            ?.sort(
              (a, b) => (a?.category?.rank ?? 0) - (b?.category?.rank ?? 0),
            )
            ?.map((item) => {
              return (
                <Category
                  key={item?.category?._id}
                  category={item?.category}
                  menus={item?.menus?.filter((menu) => !!menu)}
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
