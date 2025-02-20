import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface Settings {
  isOnlyWifi: boolean;
  isLoggedIn: boolean;
  actions: {
    setIsOnlyWifi: (permitted: boolean) => void;
    setLoggedIn: (loggedIn: boolean) => Promise<void>;
    restoreLoggedIn: () => Promise<void>;
  };
}

const useSettingStore = create<Settings>((set) => ({
  isOnlyWifi: false,
  isLoggedIn: false,
  actions: {
    setIsOnlyWifi: async (permitted) => {
      await AsyncStorage.setItem(
        "isMobileDataPermitted",
        JSON.stringify(permitted)
      );
      set({ isOnlyWifi: permitted });
    },

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
