import { publishMenuById, unpublishMenuById } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useChangePublishMenu = () => {
  const { mutate: publishMenu } = useMutation({
    mutationFn: publishMenuById,
  });

  const { mutate: unPublishMenu } = useMutation({
    mutationFn: unpublishMenuById,
  });

  return {
    publishMenu,
    unPublishMenu,
  };
};

export default useChangePublishMenu;
