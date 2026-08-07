import { ACCESS_TOKEN_KEY } from "../config/constants"
import { tokenStorage } from "./token-storage";

export const clearStorage = () => {
  tokenStorage.clearToken(ACCESS_TOKEN_KEY);
}

