import { Redirect } from "expo-router";
import React from "react";

import useSettingStore from "../hooks/globalState/useSettingStore";
import LoginPage from "./screens/Login/LoginPage";

export default function App() {
  const { isLoggedIn } = useSettingStore();

  return isLoggedIn ? (
    <Redirect href="Home/Recommendations/Recommendations" />
  ) : (
    <LoginPage />
  );
}
