module.exports = {
  extends: [
    "universe/native",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react-native", "prettier", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn",
    "react-hooks/rules-of-hooks": "error", // Verifica las reglas de los hooks
    "react-hooks/exhaustive-deps": "warn",
    "import/order": "off", // Desactiva la regla de orden de importaciones
  },
  settings: {
    "react-native/style-sheet-object-names": ["StyleSheet"],
  },
};
