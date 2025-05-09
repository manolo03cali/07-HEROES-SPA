// Importaciones de librerías de testing
import { render, screen, fireEvent } from "@testing-library/react"; // Herramientas para testing
import { AuthContext } from "../../../auth"; // Contexto de autenticación
import { MemoryRouter, useNavigate } from "react-router-dom"; // Router para pruebas
import { Navbar } from "../../../ui"; // Componente a testear
import "@testing-library/jest-dom"; // Extiende las expectativas de Jest

// Mock de la función useNavigate de react-router-dom
const mockUseNavigate = jest.fn(); // Creamos una función mockeada
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantenemos todas las funcionalidades reales
  useNavigate: () => mockUseNavigate, // Pero reemplazamos useNavigate con nuestro mock
}));

// Bloque principal de pruebas para el componente Navbar
describe("Pruebas en <Navbar/>", () => {
  // Datos mockeados para el contexto de autenticación
  const contexValue = {
    logged: true, // Usuario autenticado
    user: {
      name: "Manuel", // Nombre de usuario mockeado
    },
    logout: jest.fn(), // Función mockeada para logout
  };

  // Se ejecuta antes de cada test para limpiar los mocks
  beforeEach(() => jest.clearAllMocks());

  // Test 1: Verifica que se muestra el nombre del usuario
  test("Debe de mostrar el nombre del usuario", () => {
    // Renderizamos el componente Navbar con el contexto mockeado
    render(
      <AuthContext.Provider value={contexValue}>
        <MemoryRouter>
          {" "}
          {/* Usamos MemoryRouter para pruebas */}
          <Navbar /> {/* Componente bajo prueba */}
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Opción para debuggear: muestra el DOM renderizado
    // screen.debug();

    // Verificamos que el nombre "Manuel" aparece en el documento
    expect(screen.getAllByText("Manuel")).toBeTruthy(); // Versión menos específica
    expect(screen.getByText("Manuel")).toBeInTheDocument(); // Versión más precisa
  });

  // Test 2: Verifica el comportamiento del logout
  test("Debe de llamar el logout y navigate cuando se hace click en el boton", () => {
    // Renderizamos nuevamente el componente
    render(
      <AuthContext.Provider value={contexValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // 1. Buscamos el botón de logout por su rol y texto (insensible a mayúsculas)
    const logoutButton = screen.getByRole("button", { name: /logout/i });

    // 2. Simulamos el click en el botón
    fireEvent.click(logoutButton);

    // Verificaciones:
    expect(contexValue.logout).toHaveBeenCalled(); // Que se llamó a la función logout
    expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true }); // Que se navegó a login
  });
});
