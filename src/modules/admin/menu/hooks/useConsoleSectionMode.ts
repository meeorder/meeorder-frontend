import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type ConsoleSectionMode = "category" | "add-menu" | "edit-menu";

const useConsoleSectionMode = () => {
  const [consoleSectionMode, setConsoleSectionMode] =
    useState<ConsoleSectionMode>("category");
  const [editMenuId, setEditMenuId] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query?.["console-mode"] === "category") {
      setConsoleSectionMode("category");
      setEditMenuId(undefined);
    } else if (router.query?.["console-mode"] === "add-menu") {
      setConsoleSectionMode("add-menu");
      setEditMenuId(undefined);
    } else if (router.query?.["console-mode"] === "edit-menu") {
      setConsoleSectionMode("edit-menu");
      setEditMenuId(router.query?.["menu-id"] as string);
    }
  }, [router, router.isReady]);

  const changeToAddMenuMode = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("console-mode", "add-menu");
    searchParams.delete("menu-id");

    void router.push({
      pathname: "/admin/menu",
      query: searchParams.toString(),
    });
  };

  const changeToEditMenuMode = (menuId: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("console-mode", "edit-menu");
    searchParams.set("menu-id", menuId);

    void router.push({
      pathname: "/admin/menu",
      query: searchParams.toString(),
    });
  };

  const changeToCategoryMode = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("console-mode", "category");
    searchParams.delete("menu-id");

    void router.push({
      pathname: "/admin/menu",
      query: searchParams.toString(),
    });
  };

  return {
    consoleSectionMode,
    editMenuId,
    changeToAddMenuMode,
    changeToEditMenuMode,
    changeToCategoryMode,
  };
};

export default useConsoleSectionMode;
