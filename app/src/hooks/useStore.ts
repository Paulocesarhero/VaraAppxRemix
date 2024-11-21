import { create } from "zustand";

interface Token {
  token: string;
  setToken: (token: string) => void;
}

const useAuthStore = create<Token>((set) => ({
  token: "",
  setToken: (newToken: string) => set({ token: newToken }),
}));

export default useAuthStore;
