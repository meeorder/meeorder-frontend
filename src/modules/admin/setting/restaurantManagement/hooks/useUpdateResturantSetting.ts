import { updateSetting } from "@/modules/services/setting";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

type RestaurantSetting = {
  name?: string;
  logo?: string;
};

type RestaurantUpdateParam = {
  onSuccess?: () => void;
};

const useUpdateRestaurantSetting = (params: RestaurantUpdateParam) => {
  return useMutation({
    mutationKey: ["useUpdateRestaurantSetting"],
    mutationFn: (data: RestaurantSetting) => updateSetting(data),
    onSuccess: () => {
      void queryClient.invalidateQueries(["useRestaurantSetting"]);
      params.onSuccess && params.onSuccess();
    },
  });
};

export default useUpdateRestaurantSetting;
