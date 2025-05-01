import { useContext } from "react"; // Importa el hook `useContext` de React para acceder al contexto de autenticación.
import { useNavigate } from "react-router-dom"; // Importa el hook `useNavigate` de react-router-dom para permitir redirecciones dentro de la app.
import { AuthContext } from "../context/AuthContext"; // Importa el contexto `AuthContext` que contiene el estado y las funciones de autenticación.

export const LoginPage = () => {
  const { login } = useContext(AuthContext); // Usa `useContext` para obtener la función `login` del contexto de autenticación.
  const navigate = useNavigate(); // Obtiene la función `navigate` que permite redirigir a otras páginas de la aplicación.

  // Función para manejar el login cuando el usuario hace clic en el botón.
  const handleLogin = async () => {
    try {
      // Intenta obtener la última ruta visitada del `localStorage`. Si no existe, asigna la ruta raíz "/".
      const lastPath = localStorage.getItem("lastPath") || "/";

      // Aquí normalmente iría una llamada a API de autenticación, simulada con un login local.
      await login("Manuel Quintero"); // Llama a la función `login` y espera a que se complete. El login es simulado con el nombre "Manuel Quintero".

      // Una vez que el login es exitoso, redirige al usuario a la última página visitada o a la raíz ("/") si no hay una página guardada.
      navigate(lastPath, {
        replace: true, // Reemplaza la entrada actual en el historial de navegación para que el usuario no pueda volver a la página de login.
        //state: { from: "login" }, // Añade información sobre la ruta desde la cual se realizó la redirección, útil para control de rutas protegidas.
      });
    } catch (error) {
      // Si ocurre un error durante el login, lo captura y lo muestra en la consola.
      console.error("Login failed:", error);
      // Aquí podrías mostrar un mensaje de error al usuario, por ejemplo, un mensaje emergente o un mensaje en pantalla.
    }
  };

  return (
    // Contenedor principal de la página de login, con clases de Bootstrap para el diseño.
    <div className="container mt-5 text-center">
      {/* Fila que organiza los elementos en el centro de la página */}
      <div className="row justify-content-center">
        {/* Columna que ocupa la mitad del ancho de la pantalla en tamaños medianos hacia arriba */}
        <div className="col-md-6">
          {/* Título de la página */}
          <h1 className="mb-4">Login</h1>
          {/* Línea horizontal separadora */}
          <hr className="mb-4" />
          {/* Botón de login que al hacer clic ejecutará la función `handleLogin` */}
          <button
            className="btn btn-primary btn-lg w-100" // Estilo del botón, grande, de color primario y ocupando todo el ancho.
            onClick={handleLogin} // Asocia la acción de clic con la función `handleLogin`.
            aria-label="Iniciar sesión" // Etiqueta accesible para describir la acción del botón.
          >
            Login {/* Texto del botón */}
          </button>
        </div>
      </div>
    </div>
  );
};
