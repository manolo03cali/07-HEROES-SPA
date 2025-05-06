// Importa funciones necesarias para las pruebas con Testing Library:
// - `render`: función para renderizar componentes en un entorno de pruebas
import { render } from "@testing-library/react";

// Importa herramientas de enrutamiento de react-router-dom:
// - `MemoryRouter`: componente que maneja el enrutamiento en memoria (para pruebas)
// - `Routes` y `Route`: componentes para definir la estructura de rutas de la aplicación
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Importa el contexto de autenticación de la aplicación
// Esto permite simular estados de autenticación (usuario logueado o no)
import { AuthContext } from "../../auth";

// Importa los layouts (diseños) de la aplicación:
// - `PublicLayout`: contenedor para rutas públicas (como login)
// - `PrivateLayout`: contenedor para rutas privadas (requieren autenticación)
import { PrivateLayout } from "../../ui";

// - Páginas de heroes (rutas privadas)
import { DCPage, MarvelPage, ErrorPage } from "../../heroes";

/**
 * Función helper para renderizar componentes con autenticación y rutas configuradas
 * @param {Object} authState - Estado de autenticación a inyectar en el contexto
 * @param {string} [initialRoute="/login"] - Ruta inicial para el MemoryRouter
 * @returns {Object} Retorna el resultado de render() con la aplicación configurada
 */
export const renderPrivateRoutes = (authState, initialRoute = "/marvel") => {
  return render(
    // Provee el contexto de autenticación con el estado especificado
    <AuthContext.Provider value={authState}>
      {/* Router en memoria que simula la navegación */}
      <MemoryRouter initialEntries={[initialRoute]}>
        {/* Sistema de rutas de la aplicación */}
        <Routes>
          {/* Rutas privadas (requieren autenticación) */}
          <Route path="/" element={<PrivateLayout />}>
            {/* Ruta para página de héroes de Marvel */}
            <Route path="marvel" element={<MarvelPage />} />
            {/* Ruta para página de héroes de DC */}
            <Route path="dc" element={<DCPage />} />
            {/* Ruta comodín para manejar páginas no encontradas (404) */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
};
