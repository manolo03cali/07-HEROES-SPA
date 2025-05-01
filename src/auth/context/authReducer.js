// Se importa el objeto `types` desde el archivo de tipos, que contiene constantes para evitar errores tipográficos.
import { types } from "../types/types";

// Se define el `authReducer`, una función reductora utilizada en Redux para manejar el estado de autenticación.
// Recibe dos parámetros:
// - `state`: el estado actual (inicializado como un objeto vacío `{}` si no se proporciona uno).
// - `action`: el objeto que describe qué cambio se quiere hacer en el estado.
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    // Si el tipo de acción es `login` (usuario inicia sesión)
    case types.login:
      return {
        ...state, // Se conservan las propiedades actuales del estado
        logged: true, // Se marca que el usuario está autenticado (posiblemente se quiso escribir "logged")
        user: action.payload, // Se guarda la información del usuario enviada en el payload de la acción
      };

    // Si el tipo de acción es `logout` (usuario cierra sesión)
    case types.logout:
      return {
        logged: false, // Se marca que el usuario ya no está autenticado
        user: null,
      };

    // Si la acción no coincide con ningún caso anterior, se devuelve el estado actual sin modificar
    default:
      return state;
  }
};
