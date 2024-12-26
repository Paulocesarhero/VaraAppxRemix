module.exports = {
  extends: ["universe/native", "prettier"],
  plugins: ["react-native"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "react-native/style-sheet-object-names": ["StyleSheet"],
  },
};
