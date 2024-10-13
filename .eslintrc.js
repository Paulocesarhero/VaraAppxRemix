module.exports = {
  parser: "@typescript-eslint/parser", // Configurar el analizador de TypeScript
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended", // Extender las reglas de TypeScript
    "prettier",
  ],
  plugins: ["prettier", "@typescript-eslint"], // Agregar el plugin de TypeScript
  rules: {
    // Aquí puedes agregar otras reglas específicas que desees
  },
  // Si tienes configuraciones específicas para archivos, puedes agregarlas aquí
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Solo para archivos de TypeScript
      rules: {
        // Aquí puedes agregar reglas específicas para TypeScript
      },
    },
  ],
};
