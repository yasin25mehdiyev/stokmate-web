import { Headset, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const SidebarSupport = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full shrink-0 flex-col gap-3 rounded-xl bg-wash px-3 py-3">
      <div className="flex items-center gap-2 text-sm leading-5 font-medium tracking-[0.25px] text-secondary-brand">
        <Headset className="size-[18px] shrink-0" />
        <span className="truncate">{t("sidebar.support")}</span>
      </div>
      <div className="flex flex-col gap-1">
        <a
          href={`tel:${t("sidebar.phone").replace(/\s/g, "")}`}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs leading-4 tracking-[0.4px] text-ink-secondary hover:bg-white"
        >
          <Phone className="size-3.5 shrink-0" />
          <span className="truncate">{t("sidebar.phone")}</span>
        </a>
        <a
          href={`mailto:${t("sidebar.email")}`}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs leading-4 tracking-[0.4px] text-ink-secondary hover:bg-white"
        >
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{t("sidebar.email")}</span>
        </a>
      </div>
    </div>
  );
};

export { SidebarSupport };
