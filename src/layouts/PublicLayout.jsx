// Importaciones necesarias
import { useContext } from "react"; // Hook de React para acceder al contexto
import { Navigate, Outlet } from "react-router-dom"; // Componentes para navegación y renderizado de rutas
import { AuthContext } from "../auth"; // Contexto de autenticación

// Componente de diseño para rutas públicas
export const PublicLayout = () => {
  // Obtiene el estado de autenticación del contexto
  const { logged } = useContext(AuthContext);

  // Obtiene la última ruta visitada del localStorage, o usa '/marvel' como valor por defecto
  const lastPath = localStorage.getItem("lastPath") || "/marvel";

  // Si el usuario está autenticado...
  if (logged) {
    // Redirige a la última ruta visitada (o a '/marvel')
    // y reemplaza la entrada en el historial de navegación
    return <Navigate to={lastPath} replace />;
  }

  // Si el usuario NO está autenticado...
  return (
    // Contenedor principal para el layout público
    <div className="container">
      {/* Renderiza aquí las rutas hijas definidas en el enrutador principal */}
      <Outlet />
    </div>
  );
};
