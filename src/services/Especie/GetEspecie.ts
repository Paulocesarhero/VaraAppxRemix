import api from "../Api";
export type Especie = {
  id: number;
  nombre: string;
  nombreLatin: string;
  /**
   * @enum {number}
   * @description Tipos de taxa:
   * - 0: Misticeto
   * - 1: Pinnipedo
   * - 2: Odontoceto
   * - 3: Sirenio
   */
  taxa: number;
  familia: number;
};

export type ResponseEspecies = {
  message: string;
  data: Especie[];
  error: boolean;
};

const getEspecies = async (token: string): Promise<ResponseEspecies> => {
  const response = await api.get(`api/Especie/ObtenerEspecies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export default getEspecies;
