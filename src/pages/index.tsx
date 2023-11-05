import AppLayout from "@/modules/AppLayout";
import { Text } from "@/modules/common/components/Typography";
import { useSetSessionUser } from "@/modules/common/hooks/useSetSessionUser";
import { pages } from "@/modules/pageConfig";
import Category from "@/modules/user/menu/components/Category";
import CategoryNav from "@/modules/user/menu/components/CategoryNav";
import useAllMenu from "@/modules/user/menu/hooks/useAllMenu";
import { useSessionIdStore } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { MagnifyingGlass, SmileySad } from "@phosphor-icons/react";
import { Button, Empty, Input } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const allMenu = useAllMenu();
  const { mutate: setSessionUser } = useSetSessionUser();
  const setSessionId = useSessionIdStore((state) => state.setSessionId);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const sessionId = router.query["session-id"];
    if (typeof sessionId === "string" && sessionId.length > 0) {
      setSessionId(sessionId);
    }
  }, [router, setSessionId]);

  useEffect(() => {
    setSessionUser();
  }, [setSessionUser]);

  const [searchText, setSearchText] = useState("");
  const onSearch = (value: string) => setSearchText(value);

  const filterMenus = allMenu?.data
    ?.sort((a, b) => (a?.category?.rank ?? 0) - (b?.category?.rank ?? 0))
    ?.map((item) => {
      return {
        ...item,
        menus: item?.menus?.filter(
          (menu) =>
            menu?.can_order === true &&
            !!menu &&
            [...searchText].every(
              (char) => menu?.title?.toLowerCase().includes(char.toLowerCase()),
            ),
        ),
      };
    })
    ?.filter((item) => item?.menus?.length > 0);

  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        <CategoryNav
          categories={
            filterMenus?.map((item) => {
              return item?.category;
            }) ?? []
          }
        />
        <MenuContainer>
          <Input
            placeholder="ค้นหาเมนู"
            allowClear
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            style={{ width: "100%", zIndex: 0 }}
            suffix={<MagnifyingGlass />}
          />
          {filterMenus?.length ? (
            filterMenus?.map((item) => {
              return (
                <Category
                  key={item?.category?._id}
                  category={item?.category}
                  menus={item?.menus}
                />
              );
            })
          ) : (
            <Empty
              description=""
              image={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <SmileySad size={200} color="gray" />
                  <Text type="secondary">ไม่พบเมนูที่คุณต้องการ</Text>
                  <Button type="primary" onClick={() => setSearchText("")}>
                    ล้างการค้นหา
                  </Button>
                </div>
              }
              style={{
                marginTop: "20px",
              }}
            />
          )}
        </MenuContainer>
      </AppLayout>
    </>
  );
};

export default Home;

const MenuContainer = styled.div`
  background-color: ${(props) => props.theme.antd.colorBgBase};
  min-height: calc(100dvh - 128px);
  height: 100%;
  padding-inline: 20px;
  padding-top: 48px;
`;
