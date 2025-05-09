// Importaciones necesarias para las pruebas
import { render, screen, fireEvent } from "@testing-library/react"; // Herramientas básicas de Testing Library
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom"; // Componentes de enrutamiento para pruebas
import { HeroPage } from "../../../heroes"; // Componente a probar
import { getHeroyById } from "../../../heroes/helpers"; // Helper para obtener datos de héroes
import "@testing-library/jest-dom"; // Extiende Jest con matchers adicionales para el DOM

// Mock de la función useNavigate para simular y espiar la navegación
const mockUseNavigate = jest.fn();

// Configuración del mock para react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantiene todas las funcionalidades reales
  useNavigate: () => mockUseNavigate, // Reemplaza useNavigate con nuestro mock
  useParams: jest.fn(), // Mock de useParams
}));

// Bloque principal de pruebas para el componente HeroPage
describe("Pruebas en <HeroPage />", () => {
  // Configuración que se ejecuta antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks para evitar interferencias
    // Configura useParams para devolver un ID de héroe por defecto (Batman)
    useParams.mockReturnValue({ id: "dc-batman" });
  });

  // Prueba 1: Verifica el renderizado correcto cuando el héroe existe
  test("debe mostrar el héroe correctamente cuando existe", () => {
    // Obtiene los datos reales del héroe usando el helper
    const realHero = getHeroyById("dc-batman");

    // Renderiza el componente dentro de MemoryRouter con una ruta inicial
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificación del contenido renderizado:

    // 1. Verifica que el nombre del superhéroe se muestra
    expect(screen.getByText(realHero.superhero)).toBeInTheDocument();

    // 2. Verificación específica para el alter ego (evitando duplicados)
    // Primero encuentra el elemento "Alter ego:" y luego sube al li padre
    const alterEgoItem = screen.getByText("Alter ego:").closest("li");
    // Verifica que el li contiene el alter ego correcto
    expect(alterEgoItem).toHaveTextContent(realHero.alter_ego);

    // 3. Verifica otros datos del héroe
    expect(screen.getByText(realHero.publisher)).toBeInTheDocument();
    expect(screen.getByText(realHero.first_appearance)).toBeInTheDocument();

    // 4. Verificación de la imagen del héroe
    const img = screen.getByRole("img"); // Encuentra por rol accesible
    expect(img).toHaveAttribute("src", `/heroes/${realHero.id}.jpg`); // Verifica la ruta de la imagen
    expect(img).toHaveAttribute("alt", realHero.superhero); // Verifica el texto alternativo

    // 5. Verifica que el botón de regresar está presente
    expect(
      screen.getByRole("button", { name: /regresar/i }) // Busca por rol y texto
    ).toBeInTheDocument();
  });

  // Prueba 2: Verifica la redirección cuando el héroe no existe
  test("debe redirigir a /marvel cuando el héroe no existe", () => {
    // Configura useParams para simular un ID de héroe que no existe
    useParams.mockReturnValue({ id: "heroe-inexistente" });

    // Renderiza el componente con rutas alternativas
    render(
      <MemoryRouter initialEntries={["/hero/heroe-inexistente"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
          <Route path="/marvel" element={<h1>Página Marvel</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que se muestra la página de Marvel (redirección exitosa)
    expect(screen.getByText("Página Marvel")).toBeInTheDocument();
  });

  // Prueba 3: Verifica el comportamiento del botón "Regresar"
  test("debe navegar correctamente al hacer click en Regresar", () => {
    // Obtiene los datos reales del héroe
    const realHero = getHeroyById("dc-batman");

    // Renderiza el componente
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Encuentra y hace click en el botón de regresar
    const backButton = screen.getByRole("button", { name: /regresar/i });
    fireEvent.click(backButton);

    // Determina la ruta esperada según el publisher del héroe
    const expectedRoute = realHero.publisher.includes("Marvel")
      ? "/marvel"
      : "/dc";

    // Verifica que navigate fue llamado con los parámetros correctos
    expect(mockUseNavigate).toHaveBeenCalledWith(expectedRoute, {
      replace: true,
    });
  });
});
