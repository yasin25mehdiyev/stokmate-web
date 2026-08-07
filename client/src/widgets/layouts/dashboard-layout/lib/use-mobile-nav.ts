import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const useMobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [prevPathname, setPrevPathname] = useState<string>(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return { open, onOpenChange: setOpen };
};

export { useMobileNav };
