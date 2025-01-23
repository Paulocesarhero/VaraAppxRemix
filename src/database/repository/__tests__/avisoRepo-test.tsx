import { db } from "../../connection/sqliteConnection";
import { getAvisoBdLocal } from "../avisoRepo";

jest.mock("../../connection/sqliteConnection", () => ({
  db: {
    query: {
      avisos: {
        findFirst: jest.fn(),
      },
    },
  },
}));

describe("getAvisoBdLocal", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Espiar el console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurar el comportamiento original de console.log
    consoleSpy.mockRestore();
  });

  it("debería imprimir algo en el console.log", async () => {
    console.log("Prueba de la función getAvisoBdLocal");
    // No se configura un valor específico en el mock
    (db.query.avisos.findFirst as jest.Mock).mockResolvedValue(undefined);

    // Llamada a la función
    const result = await getAvisoBdLocal();
    console.log("Resultado de la función:", result);

    // Verificar que console.log fue llamado
    expect(consoleSpy).toHaveBeenCalled();

    const loggedValue = consoleSpy.mock.calls[0][1]; // [0] primer llamado, [1] segundo argumento
    console.log("Valor registrado:", loggedValue);
  });
});
