import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,

  setToken: (newToken: string) => set({ token: newToken }),

  clearToken: () => set({ token: null }),

  isAuthenticated: () => !!useAuthStore.getState().token,
}));

export default useAuthStore;
