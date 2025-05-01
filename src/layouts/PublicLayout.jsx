// Importamos el hook useContext de React para consumir valores de un contexto.
import { useContext } from "react";

// Importamos componentes de react-router-dom:
// - Navigate se usa para redirigir a otra ruta.
// - Outlet se utiliza para renderizar componentes hijos en rutas anidadas.
import { Navigate, Outlet } from "react-router-dom";

// Importamos el AuthContext que contiene información sobre la autenticación del usuario.
import { AuthContext } from "../auth/context";

// Definimos un componente funcional llamado PublicLayout.
export const PublicLayout = () => {
  // Obtenemos el estado de autenticación desde el contexto.
  // 'logged' indica si el usuario ha iniciado sesión.
  const { logged } = useContext(AuthContext);

  // Si el usuario ya está autenticado, redirigimos a la última ruta visitada.
  // Esto evita que el usuario vea páginas públicas como login si ya está logueado.
  if (logged) {
    // Obtenemos la última ruta visitada desde localStorage, o usamos '/marvel' por defecto.
    const lastPath = localStorage.getItem("lastPath") || "/marvel";

    // Redirigimos a esa ruta, usando `replace` para evitar que el usuario pueda volver a la página pública con el botón de atrás.
    return <Navigate to={lastPath} replace />;
  }

  // Si el usuario NO está autenticado, permitimos el acceso al contenido público.
  // Outlet renderiza el componente correspondiente según la ruta hija.
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
