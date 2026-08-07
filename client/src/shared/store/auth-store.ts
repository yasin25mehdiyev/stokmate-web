import { create } from "zustand";
import { tokenStorage, clearStorage } from "@/shared/lib";
import { ACCESS_TOKEN_KEY } from "@/shared/config/constants";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!tokenStorage.getToken(ACCESS_TOKEN_KEY),

  login: () => set({ isAuthenticated: true }),

  logout: () => {
    clearStorage();
    set({ isAuthenticated: false });
  },
}));
