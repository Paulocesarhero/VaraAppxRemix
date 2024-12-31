import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface Settings {
  isMobileDataPermitted: boolean;
  isLoggedIn: boolean;
  actions: {
    setMobileDataPermitted: (permitted: boolean) => void;
    setLoggedIn: (loggedIn: boolean) => Promise<void>;
    restoreLoggedIn: () => Promise<void>;
  };
}

const useSettingStore = create<Settings>((set) => ({
  isMobileDataPermitted: false,
  isLoggedIn: false,
  actions: {
    setMobileDataPermitted: (permitted) =>
      set({ isMobileDataPermitted: permitted }),

    setLoggedIn: async (loggedIn) => {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(loggedIn));
      set({ isLoggedIn: loggedIn });
    },

    restoreLoggedIn: async () => {
      const savedLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (savedLoggedIn !== null) {
        set({ isLoggedIn: JSON.parse(savedLoggedIn) });
      }
    },
  },
}));

export default useSettingStore;
