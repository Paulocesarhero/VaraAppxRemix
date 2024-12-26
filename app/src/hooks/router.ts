import { router } from "expo-router";

export const handleBack = () => {
  router.back();
};

export const handleHome = () => {
  router.push("/");
};
