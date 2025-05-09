import { screen, waitFor } from "@testing-library/react";

import { renderWithPublicRoutes } from "./renderWithPublicRoutes";
import "@testing-library/jest-dom";

describe("Pruebas en <PublicLayout /> - Rutas Públicas", () => {
  const unauthenticatedState = {
    logged: false,
    user: { name: "Test", id: "123" },
  };

  beforeEach(() => {
    localStorage.clear();
  });
  test("Debe renderizar LoginPage en /login cuando el usuario NO está autenticado", async () => {
    renderWithPublicRoutes(unauthenticatedState, "/login");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /login/i })
      ).toBeInTheDocument();
    });
  });
  test("No debe mostrar contenido privado en rutas públicas", async () => {
    renderWithPublicRoutes(unauthenticatedState, "/login");

    expect(screen.queryByText(/Marvel Comics/i)).toBeNull();
    expect(screen.queryByText(/DC Comics/i)).toBeNull();
    // Verifica que no hay elementos de navegación privada
    expect(screen.queryByRole("link", { name: /marvel/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /dc/i })).toBeNull();
  });

  test("Debe permitir acceso a rutas públicas sin autenticación", async () => {
    renderWithPublicRoutes({ logged: false }, "/login");

    expect(
      await screen.findByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
    // Verifica que no hay redirección
    expect(screen.queryByText(/Marvel Comics/i)).toBeNull();
  });
});
