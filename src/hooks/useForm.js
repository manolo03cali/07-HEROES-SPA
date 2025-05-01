// Importamos el hook useState desde React para manejar el estado del formulario
import { useState } from "react";

// Definimos el custom hook useForm, que recibe como parámetro un objeto inicial para el formulario
export const useForm = (initialForm = {}) => {
  // Creamos un estado llamado formState con los valores iniciales del formulario
  const [formState, setformState] = useState(initialForm);

  // Esta función se encarga de manejar los cambios en los inputs del formulario
  const onInputChange = ({ target }) => {
    const { name, value } = target;

    // Actualizamos el estado del formulario usando el nombre del input como clave
    setformState({
      ...formState, // Mantenemos los demás valores del formulario
      [name]: value, // Actualizamos solo el campo que cambió
    });
  };

  const onResetForm = () => {
    setformState(initialForm);
  };

  // Retornamos:
  // - Todas las propiedades individuales del formulario (spread de formState)
  // - El estado completo del formulario (formState)
  // - La función para manejar cambios en los inputs (onInputChange)
  return {
    ...formState, // Permite acceder a los valores del formulario directamente (ej: username, email, etc.)
    formState, // Permite acceder al estado completo del formulario si se necesita
    onInputChange, // Se utiliza en los inputs para manejar los cambios
    onResetForm,
  };
};
