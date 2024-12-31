import api from "../Api";
export type Especie = {
  id: number;
  nombre: string;
  nombreLatin: string;
  taxa: number;
  familia: number;
};

export type ResponseEspecies = {
  message: string;
  data: Especie[];
  error: boolean;
};

const getEspecies = async (token: string): Promise<ResponseEspecies> => {
  try {
    const response = await api.get(`api/Especie/ObtenerEspecies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default getEspecies;
