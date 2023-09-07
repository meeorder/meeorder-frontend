import { useEffect, useState } from "react";

export const useClient = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  return { isClientLoaded };
};
