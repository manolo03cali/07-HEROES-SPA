import { render, screen } from "@testing-library/react"; // Importa las funciones necesarias de la librería para renderizar componentes y buscar elementos en el DOM durante las pruebas.
import { MemoryRouter, Routes, Route } from "react-router-dom"; // Importa los componentes necesarios de react-router-dom para simular la navegación dentro de la prueba.
import { AuthContext } from "../../auth"; // Importa el contexto de autenticación, que probablemente contiene el estado de si un usuario está autenticado o no.
import { PublicLayout } from "../../ui"; // Importa el layout público de tu aplicación, que envuelve las rutas públicas.
import { LoginPage } from "../../auth"; // Importa la página de login que será renderizada cuando se navegue a la ruta '/login'.
import "@testing-library/jest-dom"; // Importa las aserciones extendidas para Jest, como `toBeInTheDocument`, que se usa para verificar si un elemento está presente en el DOM.

test("Debe renderizar LoginPage al navegar a /login", async () => {
  // Define una prueba que verifica si la página de login se renderiza correctamente cuando se navega a '/login'.
  const contextValue = { logged: false }; // Define un valor para el contexto de autenticación. En este caso, estamos simulando que el usuario no está autenticado (logged: false).

  render(
    // Llama a la función `render` de Testing Library para renderizar el componente.
    <AuthContext.Provider value={contextValue}>
      // Envuelve el componente con el proveedor del contexto `AuthContext`
      pasando el valor simulado de autenticación.
      <MemoryRouter initialEntries={["/login"]}>
        // Usa `MemoryRouter` para simular la navegación en las pruebas,
        iniciando en la ruta '/login'.
        <Routes>
          // Contenedor para las rutas en `react-router-dom v6`, define el
          enrutamiento de la aplicación.
          <Route path="/" element={<PublicLayout />}>
            // Define la ruta principal que renderiza el layout público.
            <Route path="login" element={<LoginPage />} /> // Define una ruta
            secundaria '/login' que renderiza la página de login.
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const loginHeading = await screen.findByRole("heading", { name: /login/i }); // Busca un encabezado en el DOM con el texto 'login', insensible a mayúsculas y minúsculas.
  expect(loginHeading).toBeInTheDocument(); // Asegura que el encabezado con el nombre 'login' esté presente en el DOM, es decir, que la página de login se haya renderizado correctamente.
});
