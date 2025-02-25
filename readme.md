# VaraAppx

## Descripción

VaraAppx integra una serie de herramientas y funcionalidades avanzadas que ayudan a los científicos a realizar sus
tareas
de manera más eficiente. Los componentes proporcionados por la
biblioteca [Componentes VaraApp](https://github.com/Paulocesarhero/VaraApppLib) forman la base de la interfaz y
la lógica de la aplicación. Sin embargo, debido a los requisitos únicos del campo de investigación, también he
desarrollado componentes personalizados que están exclusivamente disponibles en VaraAppx.

## Drizzle orm

Como tal probablemente no sea necesario modificar las migraciones que estan en el proyecto
pero si por alguna razón cambia el esquema de la base de datos o los requisotos

1. Se modifica el esquema esta dentro de [schemas](src/database/schemas)
2. ejecutar el comando
```
 npx drizzle-kit generate
```
` para generar la migración

## Instalación

Para empezar a trabajar con VaraAppx, sigue estos pasos:

1. Instalar dependencias
     ```bash
    npm i
2. Ejecuta el comando de inicialización del proyecto:
   ```bash
   npm start

## Ejecutar eslint

   ```bash
   npm run lint
   ```

## Ejecutar formateador

   ```bash
   npm run format
   ```

# Ejecutar documentación ADR

1. instalar log4brains globalmente

   ```bash

   npm install -g log4brains

   ```
2. Iniciar el servidor para previsualizar

   ```bash
   log4brains init  
   ```

# Maestro pruebas e2e
1. Instalar maestro
   https://docs.maestro.dev/getting-started/installing-maestro
2. en raiz de proyecto /VaraAppx
3. Ejecutar el prebuild de ios
```bash
   npx expo run:ios
```
4. En otra terminal, ejecutar 
   ```bash
   maestro test .maestro/{prueba a ejecutar}  
   ```

## Nuevos casos de prueba
1. Formatos comunes para nombrar casos de prueba
   ✅ 1.1. [Módulo][Funcionalidad][Escenario esperado]
   Este formato es claro y fácil de leer:

📌 Ejemplo:

   ```yaml
      Login_IngresoUsuario_CredencialesCorrectas.yaml
      Login_IngresoUsuario_CredencialesIncorrectas.yaml
      Perfil_ActualizacionDatos_Exito.yaml
   ```
💡 Ventaja: Es fácil agrupar pruebas por módulos y funcionalidades.
### Maestro estudio
Maestro estudio es una herramienta que puede ayudar a generar nuevos casos de prueba
1. Ejecutar el prebuild de ios
   ```bash
      npx expo run:ios
   ```

2. En otra terminal, ejecutar en raiz de proyecto
   ```bash
      maestro studio
   ```

Memento mori
Buena suerte :)
