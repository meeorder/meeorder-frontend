import { replaceMenuById } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEditMenu = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: replaceMenuById,
    onSuccess: () => {
      // todo invalidate query
      const params = new URLSearchParams(window.location.search);
      params.delete("id");
      params.set("console-mode", "category");
      void router.push({
        pathname: "/admin/menu",
        query: params.toString(),
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
};

export default useEditMenu;
