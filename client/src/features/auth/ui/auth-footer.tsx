import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";

const AuthFooter = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="mt-[clamp(16px,4vh,48px)] flex flex-col items-center gap-1 border-t border-outline pt-[clamp(16px,3vh,32px)]">
      <Button
        asChild
        variant="ghost"
        size={36}
        className="text-ink hover:bg-transparent hover:text-ink active:bg-transparent active:text-ink"
      >
        <a
          href={`tel:${t("sidebar.phone", { ns: "common" }).replace(/\s/g, "")}`}
        >
          {t("contactSupport")}
        </a>
      </Button>
      <Typography
        as="p"
        variant="span"
        color="tertiary"
        className="text-center text-[10px] leading-4"
      >
        {t("footerDisclaimer")}
      </Typography>
    </div>
  );
};

export { AuthFooter };
