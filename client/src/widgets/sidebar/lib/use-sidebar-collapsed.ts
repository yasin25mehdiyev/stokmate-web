import { useState } from "react";

const useSidebarCollapsed = (initial = false) => {
  const [collapsed, setCollapsed] = useState<boolean>(initial);

  const toggleCollapsed = () => setCollapsed((value) => !value);

  return { collapsed, toggleCollapsed };
};

export { useSidebarCollapsed };
