import api from "../Api";
import { AvisoApiGet, getAvisosVaraWeb } from "../Avisos/GetAvisosVaraWeb";

jest.mock("../Api");

describe("getAvisos", () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  it("debe retornar una lista de avisos cuando la API responde correctamente", async () => {
    const mockData: AvisoApiGet[] = [
      {
        id: 1,
        fechaDeAvistamiento: "2024-12-01",
        cantidadDeAnimales: "5",
        fotografia: null,
      },
      {
        id: 2,
        fechaDeAvistamiento: "2024-12-02",
        cantidadDeAnimales: "3",
        fotografia: "foto2.jpg",
      },
    ];

    // Configuración del mock
    mockedApi.get.mockResolvedValue({ data: mockData });

    // Llamada a la función
    const result = await getAvisosVaraWeb("mockedToken");

    // Validaciones
    expect(result).toEqual(mockData);
    expect(mockedApi.get).toHaveBeenCalledWith("api/Aviso/Avisos", {
      headers: { Authorization: "Bearer mockedToken" },
    });
  });

  it("debe lanzar un error si la API falla", async () => {
    // Configurar el mock para simular un error
    mockedApi.get.mockRejectedValue(new Error("Error de red"));

    // Validar que se lanza el error correcto
    await expect(getAvisosVaraWeb("mockedToken")).rejects.toThrow(
      "No se pudieron obtener los avisos."
    );
    expect(mockedApi.get).toHaveBeenCalledWith("api/Aviso/Avisos", {
      headers: { Authorization: "Bearer mockedToken" },
    });
  });
});
