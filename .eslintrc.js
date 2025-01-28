module.exports = {
  extends: ["universe/native", "prettier"],
  plugins: ["react-native"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "error",
  },
  settings: {
    "react-native/style-sheet-object-names": ["StyleSheet"],
  },
};
