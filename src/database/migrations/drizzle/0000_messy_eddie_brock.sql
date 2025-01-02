CREATE TABLE `avisos`
(
    `id`                        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `nombre`                    TEXT,
    `nombreObservador`          TEXT,
    `telefono`                  TEXT,
    `facilAcceso`               INTEGER DEFAULT 0,
    `acantilado`                INTEGER DEFAULT 0,
    `sustrato`                  INTEGER,
    `lugarDondeSeVio`           INTEGER,
    `fechaDeAvistamiento`       TEXT,
    `tipoDeAnimal`              INTEGER,
    `observaciones`             TEXT,
    `condicionDeAnimal`         INTEGER,
    `cantidadDeAnimales`        INTEGER,
    `informacionDeLocalizacion` TEXT,
    `latitud`                   TEXT,
    `longitud`                  TEXT,
    `fotografia`                TEXT
);

CREATE TABLE `ambiente`
(
    `id`                          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `temperaturaAmbiente`         INTEGER,
    `precipitacionHoy`            INTEGER,
    `temperaturaSupMar`           INTEGER,
    `marea`                       INTEGER,
    `mareaMedida`                 INTEGER,
    `direccionCorriente`          INTEGER,
    `direccionDelViento`          INTEGER,
    `velocidadDelViento`          INTEGER,
    `nubosidad`                   INTEGER,
    `oleaje`                      INTEGER,
    `beaufort`                    INTEGER,
    `precipitacionTormentaPrevia` INTEGER,
    `anormalidadGeomagnetica`     INTEGER,
    `mareaRoja`                   INTEGER DEFAULT 0,
    `anormalidadEnLaPesca`        TEXT,
    `aviso_id`                    INTEGER,
    FOREIGN KEY (`aviso_id`) REFERENCES `avisos` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE INDEX `aviso_idx` ON `ambiente` (`aviso_id`);
