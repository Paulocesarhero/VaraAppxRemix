module.exports = {
  extends: ["universe/native", "prettier"],
  plugins: ["react-native"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn",
  },
  settings: {
    "react-native/style-sheet-object-names": ["StyleSheet"],
  },
};
