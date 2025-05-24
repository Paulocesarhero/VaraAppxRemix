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
    yarn
    ```
2. Ejecuta el comando de inicialización del proyecto:
   ```bash
   yarn start
    ```

## Ejecutar eslint

   ```bash
   yarn run lint
   ```

## Ejecutar formateador

   ```bash
   yarn run format
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
# Drizzle studio
Para almacenar datos localmente en el dispositivo, se utilizó Drizzle. La base de datos local puede visualizarse a través de las herramientas de desarrollo de Expo siguiendo estos pasos:
1. Levantar el servicio de expo
    ```bash
    yarn
    ```
2. Presionar las teclas shft + m
3. Con las teclas de navegación seleccionar la opción de "open-expo-drizzle-studio"

# Recomendaciones para el desarrollador
1. Aprende bien los fundamentos de git para trabajar en el fork que deje y mantener un historial limpio
2. Aprender antes de tocar el proyecto los conceptos de react, react native, expo, typescript y drizzle
3. La organización del proyecto se debe a Expo Router Apps -> es lo equivalente a las pantallas; todo lo demás está separado en capas ad hoc a la tecnología que se ocupó.
4. Aunque los directores probablemente quieran separar este proyecto en dos uno para android y otro para ios, no es necesario. Expo se encarga de la separación de los módulos nativos y de la compilación para cada plataforma. Recomiendo encarecidamente seguir con un desarrollo multiplataforma en el futuro
5. Es posible que el proyecto no se compile correctamente con cada actualización del SDK de Expo. Por ello, se recomienda actualizar regularmente las dependencias de esta aplicación junto con la librería de VaraAppLib. Durante el desarrollo, se realizaron dos actualizaciones del SDK, lo que generó problemas al actualizar las dependencias de VaraAppLib y adaptarlas a VaraAppX. Sin embargo, generalmente basta con leer la documentación de Expo sobre cómo actualizar las dependencias para resolver estos inconvenientes.
6. En el componente `SettingsPage.tsx` dejé comentado un componente que me sirvió para depurar la aplicación durante su desarrollo. Puede ser útil en el futuro. El componente en cuestión se llama `Depurador.tsx`.
Memento mori.
Buena suerte :)
