// Importaciones necesarias para las pruebas
import { render, screen, fireEvent } from "@testing-library/react"; // Funciones para renderizar componentes, acceder al DOM y simular eventos
import { AuthContext, LoginPage } from "../../../auth"; // Se importa el contexto de autenticación y el componente a probar
import "@testing-library/jest-dom"; // Extiende Jest con matchers como `toBeInTheDocument`

// Mock de funciones que usará nuestro componente
const mockUseNavigate = jest.fn(); // Crea una función falsa para simular `useNavigate`
const mockLogin = jest.fn(); // Crea una función falsa para simular `login`

// Reemplaza `useNavigate` de react-router-dom por nuestro mock personalizado
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantiene el resto de funcionalidades reales de react-router-dom
  useNavigate: () => mockUseNavigate, // Reemplaza `useNavigate` con nuestra función mock
}));

// Grupo de pruebas para el componente LoginPage
describe("Pruebas en el componente <LoginPage/>", () => {
  // Valor de contexto que se pasará al componente
  const contextValue = {
    authState: { logged: false, user: null }, // Simula un usuario no autenticado
    login: mockLogin, // Se usa el mock de login para comprobar que se llama
    logout: jest.fn(), // Se declara logout aunque no se usa en estas pruebas
  };

  // Antes de cada test, se limpian los mocks para evitar interferencias entre pruebas
  beforeEach(() => {
    jest.clearAllMocks(); // Resetea las llamadas y datos de los mocks
  });

  // Test 1: Verifica el renderizado inicial del componente
  test("Debe de verificar que el componente se renderiza correctamente", () => {
    // Se renderiza LoginPage dentro del proveedor del contexto con los valores definidos
    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Verifica que el componente coincide con el snapshot previamente guardado
    expect(container).toMatchSnapshot();

    // Verifica que el título "Login" aparece en el documento
    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();

    // Verifica que el botón con aria-label "Iniciar sesión" está presente
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  // Test 2: Verifica que se llama a `login` cuando se hace clic en el botón
  test("Debe de llamar login al hacer click en el botón", () => {
    // Renderiza el componente con el mismo contexto de autenticación
    render(
      <AuthContext.Provider value={contextValue}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Busca el botón de iniciar sesión por su nombre accesible
    const button = screen.getByRole("button", { name: /Iniciar sesión/i });

    // Simula un clic sobre el botón
    fireEvent.click(button);

    // Verifica que `login` fue llamado una vez
    expect(mockLogin).toHaveBeenCalled();

    // Verifica que fue llamado con el nombre esperado
    expect(mockLogin).toHaveBeenCalledWith("Manuel Quintero");
  });
});
