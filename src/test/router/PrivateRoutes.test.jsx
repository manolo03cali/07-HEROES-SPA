import { screen, waitFor } from "@testing-library/react";

import { renderWithPrivateRoutes } from "./renderWithPrivateRoutes";
import "@testing-library/jest-dom";

describe("Pruebas en <PrivateLayout /> - Rutas Privadas", () => {
  const authState = {
    logged: true,
    user: { name: "Test", id: "123" },
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("Renderiza MarvelPage correctamente para usuario autenticado", async () => {
    renderWithPrivateRoutes(authState, "/marvel");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Marvel Comics/i })
      ).toBeInTheDocument();
    });
    expect(screen.queryByText(/login/i)).toBeNull();
  });
  test("Renderiza DCPage correctamente para usuario autenticado", async () => {
    renderWithPrivateRoutes(authState, "/dc");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /DC Comics/i })
      ).toBeInTheDocument();
    });
    expect(screen.queryByText(/login/i)).toBeNull();
  });
  test("Muestra ErrorPage para rutas no existentes", async () => {
    renderWithPrivateRoutes(authState, "/ruta-inexistente");

    expect(await screen.findByText(/404/i)).toBeInTheDocument();
  });

  test("No muestra contenido privado si no está autenticado", async () => {
    renderWithPrivateRoutes({ logged: false }, "/marvel");

    await waitFor(() => {
      // Verifica que no se muestra el contenido de Marvel
      expect(screen.queryByText(/Marvel Comics/i)).toBeNull();
      // Verifica que no se muestra ningún contenido privado
      expect(screen.queryByText(/Spider Man/i)).toBeNull();
    });
  });
});
