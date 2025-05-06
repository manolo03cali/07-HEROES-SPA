import { screen, waitFor } from "@testing-library/react";
import { renderIntegraciónRoutes } from "./renderIntegración";
import "@testing-library/jest-dom";

describe("Pruebas de Integración - Flujo completo de rutas", () => {
  const authState = {
    logged: true,
    user: { name: "Test", id: "123" },
  };
  beforeEach(() => {
    localStorage.clear();
  });

  test("Usuario autenticado es redirigido desde /login a su última ruta visitada (/marvel)", async () => {
    localStorage.setItem("lastPath", "/marvel");
    renderIntegraciónRoutes(authState, "/login");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Marvel Comics/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/login/i)).toBeNull();
    });
  });

  test("Usuario autenticado es redirigido a /marvel (ruta por defecto) cuando no hay última ruta guardada", async () => {
    // No establecer lastPath para probar el comportamiento por defecto
    renderIntegraciónRoutes(authState, "/login");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Marvel Comics/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/login/i)).toBeNull();
    });
  });

  test("Usuario NO autenticado puede acceder a /login y ve el formulario", async () => {
    renderIntegraciónRoutes(
      {
        logged: false,
      },
      "/login"
    );

    expect(
      await screen.findByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
  });

  test("Muestra ErrorPage (404) para rutas no existentes cuando el usuario está autenticado", async () => {
    renderIntegraciónRoutes(authState, "/ruta-inexistente");

    expect(await screen.findByText(/404/i)).toBeInTheDocument();
  });

  test("Redirige correctamente a /dc cuando es la última ruta visitada", async () => {
    localStorage.setItem("lastPath", "/dc");
    renderIntegraciónRoutes(authState, "/login");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /DC Comics/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/login/i)).toBeNull();
    });
  });
});
