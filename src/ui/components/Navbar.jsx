// Se importan Link y NavLink desde react-router-dom para navegar entre rutas sin recargar la página.
import { Link, NavLink, useNavigate } from "react-router-dom";

// Se importa useContext para acceder al contexto global.
import { useContext } from "react";

// Se importa el contexto de autenticación para acceder a los datos del usuario y funciones como logout.
import { AuthContext } from "../../auth/context/AuthContext";

// Componente de la barra de navegación (Navbar)
export const Navbar = () => {
  // Hook para redireccionar a otras rutas programáticamente
  const navigate = useNavigate();

  // Se obtiene el usuario y la función logout del contexto de autenticación
  const { user, logout } = useContext(AuthContext);

  // Función manejadora para cerrar sesión
  const onLogout = () => {
    logout(); // Cierra sesión eliminando el estado del usuario
    navigate("/login", {
      replace: true, // Reemplaza la entrada actual en el historial para evitar volver atrás con el botón del navegador
    });
  };

  return (
    // Estructura de la barra de navegación con clases de Bootstrap para estilo oscuro y diseño responsive
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
      <div className="container-fluid">
        {/* Logo o título del navbar. El componente Link evita recargar la página */}
        <Link className="navbar-brand" to="/">
          Asociaciones de Hérores
        </Link>

        {/* Botón tipo hamburguesa visible en pantallas pequeñas para colapsar/expandir el menú */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav" // Asociado al div colapsable mediante ID
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor colapsable del contenido de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Lista de navegación alineada a la derecha (ms-auto) */}
          <ul className="navbar-nav ms-auto">
            {/* Enlace a la página Marvel. NavLink aplica clase 'active' si es la ruta actual */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/marvel"
              >
                Marvel Page
              </NavLink>
            </li>

            {/* Enlace a la página DC */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/dc"
              >
                DC Page
              </NavLink>
            </li>

            {/* Enlace a la página de búsqueda */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/search"
              >
                Search Page
              </NavLink>
            </li>

            {/* Sección que muestra el nombre del usuario autenticado */}
            <li className="nav-item">
              <span className="nav-link text-primary">{user?.name}</span>
            </li>

            {/* Botón para cerrar sesión */}
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
