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

type ResponseImage = {
  uri: string;
  existImage: boolean;
};
export const saveImage = async (photoUri: string): Promise<ResponseImage> => {
  try {
    const fileName = photoUri.split("/").pop();
    const newDir = FileSystem.documentDirectory + "VaraAppx";
    const newPath = `${newDir}/${fileName}`;

    const fileInfoRepeat = await FileSystem.getInfoAsync(newPath);
    if (fileInfoRepeat.exists) {
      return {
        uri: newPath,
        existImage: true,
      }; // El archivo ya existe en la carpeta de destino, retorna su ruta
    }

    const dirInfo = await FileSystem.getInfoAsync(newDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(newDir, { intermediates: true });
    }

    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (!fileInfo.exists) {
      throw new Error("El archivo de origen no existe" + photoUri);
    }

    await FileSystem.moveAsync({
      from: photoUri,
      to: newPath,
    });

    return { uri: newPath, existImage: false };
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado
  }
};
export const deleteImage = async (imageUri: string) => {
  const fileInfo = await FileSystem.getInfoAsync(imageUri);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(imageUri);
  }
};

export const formatHora = (fechaString: string | null): string => {
  if (!fechaString) return "";
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(fechaString));
};

export async function obtenerUbicacion(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      pais: data.address?.country || "",
      estado: data.address?.state || "",
      ciudad:
        data.address?.city || data.address?.town || data.address?.village || "",
      localidad: data.address?.suburb || "",
      informacionAdicional: data.display_name || "",
    };
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return null;
  }
}
