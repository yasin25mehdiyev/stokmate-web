import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  dialogs?: ReactNode;
}

const PageContainer = ({
  title,
  description,
  children,
  dialogs,
}: PageContainerProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size={36}
          iconOnly
          onClick={() => router.history.back()}
          className="rounded-full bg-white hover:bg-white/90"
        >
          <ArrowLeft />
        </Button>

        <div>
          <Typography variant="h4" as="h1">
            {title}
          </Typography>
          {description && (
            <Typography variant="p" color="secondary" className="mt-1">
              {description}
            </Typography>
          )}
        </div>
      </div>

      {children}
      {dialogs}
    </>
  );
};

export { PageContainer };
