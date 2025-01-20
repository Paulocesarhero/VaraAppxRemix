import * as FileSystem from "expo-file-system";

export const getDateNow = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

export const formatDate = (date: string) => {
  // Validar si la fecha está en formato "YYYY-MM-DD"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDateRegex.test(date)) {
    return date; // Regresar la fecha tal cual
  }

  // Intentar convertir la fecha considerando UTC
  const parsedDate = new Date(date);

  // Validar si es una fecha válida
  if (isNaN(parsedDate.getTime())) {
    return "Fecha inválida";
  }

  // Evitar el ajuste de zona horaria y obtener la fecha en UTC
  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const saveImage = async (photoUri: string | null): Promise<string> => {
  if (!photoUri) {
    return "";
  }

  try {
    // Extrae el nombre del archivo
    const fileName = photoUri.split("/").pop();
    // Definir la ruta de la nueva carpeta dentro de documentDirectory
    const newDir = FileSystem.documentDirectory + "VaraAppx";
    // Definir la ruta completa de destino del archivo
    const newPath = `${newDir}/${fileName}`;

    const fileInfoRepeat = await FileSystem.getInfoAsync(newPath);
    if (fileInfoRepeat.exists) {
      console.log("El archivo ya existe en la carpeta de destino:", newPath);
      return newPath; // El archivo ya existe en la carpeta de destino, retorna su ruta
    }

    // Verifica si la carpeta de destino existe, si no la crea
    const dirInfo = await FileSystem.getInfoAsync(newDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(newDir, { intermediates: true });
    }

    // Verifica si el archivo de origen existe
    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (!fileInfo.exists) {
      console.error("El archivo de origen no existe");
      throw new Error("El archivo de origen no existe");
    }

    // Mueve el archivo a la nueva ubicación
    await FileSystem.moveAsync({
      from: photoUri,
      to: newPath,
    });

    console.log("Image saved to:", newPath);
    return newPath; // Retorna el nuevo path
  } catch (error) {
    console.error("Error saving image:", error);
    throw error; // Lanza el error para que pueda ser manejado
  }
};
const deleteImage = async (imageUri: string) => {
  try {
    await FileSystem.deleteAsync(imageUri);
    console.log("Image deleted:", imageUri);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
