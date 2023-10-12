import { updateSetting } from "@/modules/services/setting";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

type RestauranttSetting = {
  name?: string;
  logo?: string;
};

const useRestaurantUpdateSetting = () => {
  return useMutation({
    mutationKey: ["useDeleteUser"],
    mutationFn: (data: RestauranttSetting) => updateSetting(data),
    onSuccess: () => {
      void queryClient.invalidateQueries(["useRestaurantGetSetting"]);
    },
  });
};

export default useRestaurantUpdateSetting;
