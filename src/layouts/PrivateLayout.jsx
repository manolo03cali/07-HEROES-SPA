// Importamos hooks y componentes necesarios de React y React Router.
import { useEffect, useContext } from "react"; // useEffect para manejar efectos secundarios, useContext para consumir contextos.
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Navigate para redirigir, Outlet para renderizar rutas hijas, useLocation para acceder a la URL actual.
import { Navbar } from "../ui"; // Navbar es el componente de navegación.
import { AuthContext } from "../auth/context"; // Importamos el contexto de autenticación.

// Definimos el componente funcional PrivateLayout.
export const PrivateLayout = () => {
  // Extraemos la variable 'logged' del contexto de autenticación.
  // Esta variable indica si el usuario está autenticado.
  const { logged } = useContext(AuthContext);

  // Extraemos 'pathname' y 'search' desde useLocation para conocer la ruta actual.
  // pathname: la ruta (por ejemplo, "/marvel").
  // search: los parámetros de búsqueda en la URL (por ejemplo, "?q=batman").
  const { pathname, search } = useLocation();

  // useEffect se ejecuta cuando 'logged', 'pathname' o 'search' cambian.
  useEffect(() => {
    // Solo guardamos la ruta si el usuario está autenticado.
    if (logged) {
      // Concatenamos pathname y search para guardar la URL completa.
      const lastPath = pathname + search;

      // Guardamos la última ruta visitada en el almacenamiento local.
      // Esto sirve para redirigir al usuario a la última ruta después de iniciar sesión.
      localStorage.setItem("lastPath", lastPath);
    }
  }, [logged, pathname, search]); // Dependencias del efecto.

  // Si el usuario NO está autenticado, lo redirigimos a la página de login.
  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, mostramos la interfaz privada:
  // - Navbar
  // - Componente hijo correspondiente (Outlet)
  return (
    <>
      <Navbar /> {/* Menú de navegación superior */}
      <div className="container">
        <Outlet />{" "}
        {/* Aquí se renderiza el componente correspondiente a la ruta actual */}
      </div>
    </>
  );
};
