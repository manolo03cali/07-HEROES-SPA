// Importación de herramientas de testing
import { render, screen, fireEvent } from "@testing-library/react"; // Funciones básicas para renderizar y probar componentes
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom"; // Componentes para simular rutas en pruebas
import { HeroPage } from "../../../heroes"; // Componente que vamos a probar
import { getHeroyById } from "../../../heroes/helpers"; // Función para obtener datos de héroes
import "@testing-library/jest-dom"; // Extiende Jest con matchers para el DOM

// Mock de useNavigate para simular navegación
const mockUseNavigate = jest.fn(); // Creamos una función mock para simular useNavigate

// Configuración de mocks para react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantenemos todas las funcionalidades reales
  useNavigate: () => mockUseNavigate, // Reemplazamos useNavigate con nuestro mock
  useParams: jest.fn(), // Mock de useParams para controlar los parámetros de ruta
}));

// Bloque principal de pruebas para HeroPage
describe("Pruebas en <HeroPage />", () => {
  // Configuración que se ejecuta antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiamos todos los mocks para evitar interferencias
    // Configuramos useParams para devolver un ID por defecto (Batman)
    useParams.mockReturnValue({ id: "dc-batman" });
  });

  // Prueba de Snapshot: Verifica que el componente se renderice correctamente
  test("Debe de mostrarse correctamente Snapshot", () => {
    // Renderizamos el componente dentro de MemoryRouter
    const { container } = render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );
    // Comparamos con el snapshot guardado
    expect(container).toMatchSnapshot();
  });

  // Prueba 1: Verifica el renderizado correcto cuando el héroe existe
  test("debe mostrar el héroe correctamente cuando existe", () => {
    // Obtenemos los datos reales del héroe usando el helper
    const realHero = getHeroyById("dc-batman");

    // Renderizamos el componente con la ruta inicial
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    /* Verificaciones del contenido renderizado */

    // 1. Verificamos que el nombre del superhéroe se muestra
    expect(screen.getByText(realHero.superhero)).toBeInTheDocument();

    // 2. Verificación del alter ego (buscamos el texto y subimos al elemento li padre)
    const alterEgoItem = screen.getByText("Alter ego:").closest("li");
    expect(alterEgoItem).toHaveTextContent(realHero.alter_ego);

    // 3. Verificamos otros datos del héroe
    expect(screen.getByText(realHero.publisher)).toBeInTheDocument();
    expect(screen.getByText(realHero.first_appearance)).toBeInTheDocument();

    // 4. Verificación de la imagen del héroe
    const img = screen.getByRole("img"); // Buscamos por rol accesible
    expect(img).toHaveAttribute("src", `/heroes/${realHero.id}.jpg`); // Ruta de imagen
    expect(img).toHaveAttribute("alt", realHero.superhero); // Texto alternativo

    // 5. Verificamos que el botón de regresar está presente
    expect(
      screen.getByRole("button", { name: /regresar/i }) // Buscamos por rol y texto
    ).toBeInTheDocument();
  });

  // Prueba 2: Verifica la redirección cuando el héroe no existe
  test("debe redirigir a /marvel cuando el héroe no existe", () => {
    // Configuramos useParams para simular un ID que no existe
    useParams.mockReturnValue({ id: "heroe-inexistente" });

    // Renderizamos el componente con rutas alternativas
    render(
      <MemoryRouter initialEntries={["/hero/heroe-inexistente"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
          <Route path="/marvel" element={<h1>Página Marvel</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que se muestra la página de Marvel (redirección exitosa)
    expect(screen.getByText("Página Marvel")).toBeInTheDocument();
  });

  // Prueba 3: Verifica el comportamiento del botón "Regresar"
  test("debe navegar correctamente al hacer click en Regresar", () => {
    // Obtenemos los datos reales del héroe
    const realHero = getHeroyById("dc-batman");

    // Renderizamos el componente
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulamos click en el botón de regresar
    const backButton = screen.getByRole("button", { name: /regresar/i });
    fireEvent.click(backButton);

    // Determinamos la ruta esperada según el publisher del héroe
    const expectedRoute = realHero.publisher.includes("Marvel")
      ? "/marvel"
      : "/dc";

    // Verificamos que navigate fue llamado con los parámetros correctos
    expect(mockUseNavigate).toHaveBeenCalledWith(expectedRoute, {
      replace: true, // Debe usar replace: true para la navegación
    });
  });
});
