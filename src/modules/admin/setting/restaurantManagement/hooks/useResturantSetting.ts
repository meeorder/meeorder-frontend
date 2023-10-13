import { getAllSettings } from "@/modules/services/setting";
import { useQuery } from "@tanstack/react-query";

const useRestaurantSetting = () => {
  return useQuery({
    queryKey: ["useRestaurantSetting"],
    queryFn: () => getAllSettings(),
  });
};

export default useRestaurantSetting;
