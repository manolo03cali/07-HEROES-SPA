// Importaciones necesarias para las pruebas
import { fireEvent, render, screen } from "@testing-library/react"; // Herramientas de Testing Library
import { MemoryRouter } from "react-router-dom"; // Router para entornos de prueba
import { SearchPage } from "../../../heroes"; // Componente a probar
import "@testing-library/jest-dom"; // Extiende las expectativas de Jest

// Mock de la función useNavigate de react-router-dom
const mockUseNavigate = jest.fn(); // Creamos una función simulada (mock)

// Configuramos el mock de react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantenemos todas las funcionalidades reales
  useNavigate: () => mockUseNavigate, // Pero reemplazamos useNavigate con nuestro mock
}));

// Bloque principal de pruebas para el componente SearchPage
describe("Pruebas en el <SearchPage/>", () => {
  // Este beforeEach se ejecuta antes de cada prueba
  beforeEach(() => jest.clearAllMocks()); // Limpia todos los mocks para evitar interferencias entre pruebas

  // Prueba 1: Verifica el renderizado inicial
  test("Debe de mostrarse correctamente con valores por defecto", () => {
    // Renderizamos el componente dentro de MemoryRouter
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    // Verificamos que coincida con el snapshot guardado
    expect(container).toMatchSnapshot();
    // screen.debug(); // Opción para debuggear el DOM renderizado
  });

  // Prueba 2: Comportamiento con parámetro de búsqueda en URL
  test("Debe de mostrar batman y el input con el valor de queryString", () => {
    // Renderizamos con ruta que incluye parámetro de búsqueda (?q=batman)
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    // Verificaciones:
    const input = screen.getByRole("textbox"); // Buscamos el input por su rol
    expect(input.value).toBe("batman"); // Comprobamos que muestra el valor de búsqueda

    const img = screen.getByRole("img"); // Buscamos la imagen por su rol
    expect(img.src).toContain("/heroes/dc-batman.jpg"); // Verificamos la ruta de la imagen

    const searchMessage = screen.getByTestId("search-message"); // Buscamos por test-id
    expect(searchMessage).toBeInTheDocument(); // Verificamos que está presente
  });

  // Prueba 3: Comportamiento con búsqueda sin resultados
  test("Debe de mostrar error si no se encuentra el heroe(batman123)", async () => {
    // Renderizamos con búsqueda que no dará resultados
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    // Buscamos el mensaje de error por su test-id (esperamos que aparezca)
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument(); // Verificamos su presencia
  });

  // Prueba 4: Comportamiento al enviar el formulario
  test("Debe de llamar el navigate a la pantalla nueva ()", () => {
    // Renderizamos el componente
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    // Simulamos interacción del usuario:
    // 1. Buscamos el input por su rol y texto accesible
    const input = screen.getByRole("textbox", { name: /search a hero/i });
    // 2. Simulamos que el usuario escribe "batman"
    fireEvent.change(input, {
      target: { name: "searchText", value: "batman" },
    });

    // 3. Buscamos el formulario por su rol
    const form = screen.getByRole("form");
    // 4. Simulamos el envío del formulario
    fireEvent.submit(form);

    // Verificación final: Comprobamos que se llamó a navigate con los parámetros correctos
    expect(mockUseNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
