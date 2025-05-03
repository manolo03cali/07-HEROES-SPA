// Se importa el hook `useReducer` de React, útil para manejar estados complejos con múltiples acciones posibles.
import { useReducer, useState } from "react";

// Se importa el contexto de autenticación que se utilizará para compartir datos entre componentes sin prop drilling.
import { AuthContext } from "./AuthContext";

// Se importa el `authReducer`, que contiene la lógica de cómo debe cambiar el estado según cada tipo de acción.
import { authReducer } from "./authReducer";

// Se importan los tipos de acciones predefinidos para evitar errores al escribir nombres de acciones.
import { types } from "../types/types";

// Función que inicializa el estado del contexto de autenticación.
// Verifica si hay un usuario guardado en `localStorage` y retorna un objeto de estado acorde.
const init = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Se intenta obtener el usuario almacenado en localStorage
  return {
    logged: !!user, // Si existe un usuario, `logged` será `true`; si no, será `false`
    user: user, // Se almacena el objeto `user` (o `null` si no hay ninguno)
  };
};

// Componente que provee el contexto de autenticación a los demás componentes de la aplicación.
export const AuthProvider = ({ children }) => {
  // Se usa `useReducer` para manejar el estado de autenticación, pasando el reducer, estado inicial vacío y la función `init`.
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  // Función para manejar el login de un usuario. Se puede personalizar para conectarse a un backend en el futuro.
  const login = (name = "") => {
    const user = { id: "ABC", name }; // Se simula un usuario autenticado
    const action = {
      type: types.login, // Acción de tipo 'login'
      payload: user, // Se envía el objeto `user` como datos de la acción
    };

    // Se guarda el usuario en el localStorage para persistir la sesión.
    localStorage.setItem("user", JSON.stringify(user));

    // Se despacha la acción al reducer, que actualizará el estado según el tipo de acción y payload.
    dispatch(action);
  };
  const logout = () => {
    localStorage.removeItem("user");

    const action = {
      type: types.logout,
    };
    dispatch(action);
  };

  // El componente retorna el `AuthContext.Provider` con el estado actual (`authState`)
  // y la función `login` como parte del valor compartido. `children` representa los componentes hijos envueltos.
  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
