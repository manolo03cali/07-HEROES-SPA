import { useEffect, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../ui";
import { AuthContext } from "../auth/context";

export const PrivateLayout = () => {
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  // useEffect se ejecuta cuando 'logged', 'pathname' o 'search' cambian.
  useEffect(() => {
    if (logged) {
      const lastPath = pathname + search;
      localStorage.setItem("lastPath", lastPath); // Guardamos la última ruta
    }
  }, [logged, pathname, search]);

  // Si el usuario NO está autenticado, lo redirigimos a la página de login
  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, mostramos la interfaz privada:
  // - Navbar
  // - Componente hijo correspondiente (Outlet)
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
