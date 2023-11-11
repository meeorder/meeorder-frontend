import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type MenuSectionMode = "preview" | "edit";

const useMenuSectionMode = () => {
  const [menuSectionMode, setMenuSectionMode] =
    useState<MenuSectionMode>("edit");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query?.["menu-mode"] === "preview") {
      setMenuSectionMode("preview");
    } else if (router.query?.["menu-mode"] === "edit") {
      setMenuSectionMode("edit");
    }
  }, [router, router.isReady]);

  const handleSetMenuSectionMode = (value: MenuSectionMode) => {
    setMenuSectionMode(value);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("menu-mode", value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  };

  return {
    menuSectionMode,
    setMenuSectionMode: handleSetMenuSectionMode,
  };
};

export default useMenuSectionMode;
