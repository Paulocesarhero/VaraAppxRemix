# Almacenamiento interno con Drizzle ORM junto con Expo SQLite

- **Estado:** [Aceptado]
- **Decisores:** [Paulo]
- **Fecha:** [2025-01-2025]

## Contexto y declaración del problema

En el contexto de persistir datos en el desarrollo multiplataforma con React Native, me encontré con varias librerías que resolvían este problema. ¿Cuál elegir?

## Factores decisivos <!-- opcional -->

- Capacidad de persistir cualquier cantidad de datos.
- Compatibilidad con el framework de Expo sin afectar el flujo de desarrollo, manteniendo el uso de Expo Go.
- Curva de aprendizaje sencilla.

## Opciones consideradas

1. Usar Expo SQLite sin un ORM.
2. Usar Expo SQLite con Drizzle ORM.
3. Usar solamente Async Storage.

## Resultado de la decisión

**Opción elegida:** "[Opción 2]", por su simplicidad y compatibilidad con Expo.

### Consecuencias positivas <!-- opcional -->

- Almacenamiento ilimitado dependiendo del almacenamiento interno del usuario.
- Migración de datos sencilla: cada vez que se inicializa la aplicación, se crea una instancia de la base de datos si no existe ya en el dispositivo.
- Facilidad para cambiar la dependencia en el futuro: si Async Storage queda obsoleto, se puede cambiar la base de datos y el controlador en la configuración sin necesidad de alterar la lógica de la aplicación.

### Consecuencias negativas <!-- opcional -->

- El tamaño de la aplicación aumentó.
- Curva de aprendizaje del ORM.

## Pros y contras de las opciones <!-- opcional -->

### [Opción 1]

**Usar Expo SQLite sin un ORM**

- **Ventajas:**
    - No se necesita una dependencia adicional como un ORM.
- **Desventajas:**
    - Las migraciones deben administrarse manualmente.
    - Dependencia de una sola base de datos.

### [Opción 2]

**Usar Expo SQLite con Drizzle ORM**

- **Ventajas:**
    - Manejo simplificado de las migraciones.
    - Escalabilidad y facilidad para cambiar la base de datos en el futuro.
    - Flexibilidad en el desarrollo al usar un ORM moderno.
- **Desventajas:**
    - Incremento en el tamaño de la aplicación.
    - Requiere aprender a usar Drizzle ORM.

### [Opción 3]

**Usar solamente Async Storage**

- **Ventajas:**
    - Implementación sencilla.
    - Ideal para manejar pequeños volúmenes de datos.
- **Desventajas:**
    - Limitado en términos de escalabilidad y tamaño de almacenamiento.
    - Menos robusto para estructuras complejas de datos.

## Enlaces <!-- opcional -->

- [Documentación de Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
