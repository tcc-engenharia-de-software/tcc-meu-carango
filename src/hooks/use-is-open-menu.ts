import { useState } from "react";

export const useIsOpenMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};
