import { toast } from "sonner";
import { isAxiosError } from "axios";

const GENERIC_ERROR_MESSAGE = "Bir hata oluştu.";

export const handleApiError = (error: unknown): void => {
  if (!isAxiosError(error)) {
    toast.error(GENERIC_ERROR_MESSAGE);
    return;
  }

  const data = error.response?.data;
  const message = typeof data === "string" ? data.trim() : "";

  toast.error(message || GENERIC_ERROR_MESSAGE);
};
