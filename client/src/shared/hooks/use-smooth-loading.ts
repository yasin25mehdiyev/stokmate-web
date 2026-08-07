import { useEffect, useRef, useState } from "react";

import { MIN_LOADING_DURATION_MS } from "@/shared/config/constants";

export const useSmoothLoading = (isLoading: boolean, minDurationMs = MIN_LOADING_DURATION_MS): boolean => {
  const [visible, setVisible] = useState<boolean>(isLoading);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      shownAtRef.current = Date.now();
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    }

    const shownAt = shownAtRef.current;
    const elapsed = shownAt === null ? minDurationMs : Date.now() - shownAt;
    const remaining = Math.max(0, minDurationMs - elapsed);

    const timeout = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(timeout);
  }, [isLoading, minDurationMs]);

  return isLoading || visible;
};
