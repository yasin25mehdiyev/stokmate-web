const STORAGE_KEY = "stokmate:return-path";
const DEFAULT_PROTECTED_PATH = "/dashboard";

export const setReturnPath = (pathname: string): void => {
  sessionStorage.setItem(STORAGE_KEY, pathname);
};

export const getReturnPath = (): string => {
  return sessionStorage.getItem(STORAGE_KEY) ?? DEFAULT_PROTECTED_PATH;
};
