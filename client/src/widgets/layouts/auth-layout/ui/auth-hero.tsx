import { useTranslation } from "react-i18next";

import { Logo } from "@/shared/icons/logo";
import { Typography } from "@/shared/ui/core/typography";

const AuthHero = () => {
  const { t } = useTranslation("auth");

  return (
    <div
      className="absolute inset-0 hidden overflow-hidden bg-hero-bg xl:block"
      aria-hidden="true"
    >
      <div className="absolute -top-40 -left-40 size-[700px] rounded-full bg-brand-500 opacity-60 blur-[130px]" />
      <div className="relative flex h-full flex-col p-16">
        <div className="flex items-center gap-2.5">
          <Logo />
          <Typography
            as="span"
            variant="h6"
            color="inverse-primary"
            className="font-bold"
          >
            {t("name", { ns: "common" })}
          </Typography>
        </div>
        <div className="mt-auto flex max-w-[550px] flex-col gap-[18px]">
          <Typography
            as="p"
            variant="p"
            color="inverse-secondary"
            className="text-lg leading-7 font-medium tracking-[0.15px]"
          >
            {t("marketingHeadline")}
          </Typography>
          <Typography
            as="p"
            variant="h3"
            color="inverse-primary"
            className="font-medium"
          >
            {t("marketingDescription")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { AuthHero };
