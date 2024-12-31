import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,

  setToken: async (newToken) => {
    await SecureStore.setItemAsync("bearerToken", newToken);
    set({ token: newToken });
  },

  clearToken: async () => {
    await SecureStore.deleteItemAsync("bearerToken");
    set({ token: null });
  },

  restoreToken: async () => {
    const savedToken = await SecureStore.getItemAsync("bearerToken");
    set({ token: savedToken });
  },
}));

export default useAuthStore;
