import { Redirect } from "expo-router";
import React from "react";

import useSettingStore from "./src/hooks/globalState/useSettingStore";
import Recommendations from "./src/screens/Home/Recommendations/Recommendations";
import LoginPage from "./src/screens/Login/LoginPage";

export default function App() {
  const { isLoggedIn } = useSettingStore();

  return isLoggedIn ? (
    <Redirect href="src/screens/Home/Recommendations/Recommendations" />
  ) : (
    <LoginPage />
  );
}
