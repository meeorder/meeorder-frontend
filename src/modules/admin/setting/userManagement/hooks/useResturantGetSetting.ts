import { getAllSettings } from "@/modules/services/setting";
import { useQuery } from "@tanstack/react-query";

const useRestaurantGetSetting = () => {
  return useQuery({
    queryKey: ["useRestaurantGetSetting"],
    queryFn: () => getAllSettings(),
  });
};

export default useRestaurantGetSetting;
