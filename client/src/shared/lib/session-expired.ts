import { toast } from "sonner";
import { useAuthStore } from "@/shared/store";
import i18n from "../i18n/config";

export const handleSessionExpired = async () => {
  await i18n.loadNamespaces("auth");
  toast.error(i18n.t("sessionExpired", { ns: "auth" }));
  useAuthStore.getState().logout();
};
