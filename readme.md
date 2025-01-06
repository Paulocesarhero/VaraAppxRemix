# VaraAppx
## Descripción

VaraAppx integra una serie de herramientas y funcionalidades avanzadas que ayudan a los científicos a realizar sus tareas 
de manera más eficiente. Los componentes proporcionados por la biblioteca [Componentes VaraApp](https://github.com/Paulocesarhero/VaraApppLib) forman la base de la interfaz y 
la lógica de la aplicación. Sin embargo, debido a los requisitos únicos del campo de investigación, también he
desarrollado componentes personalizados que están exclusivamente disponibles en VaraAppx.

## Drizzle orm
Como tal probablemente no sea necesario modificar las migraciones que estan en el proyecto
pero si por alguna razón cambia el esquema de la base de datos o los requisotos
1. Se modifica el esquema esta dentro de [schemas](src/database/schemas)
2. ejecutar el comando `npx drizzle-kit generate
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
   npm i -D drizzle-kit
   ```
2. Iniciar el servidor para previsualizar

   ```bash
   log4brains init  
   ```


Memento mori 
Buena suerte :)