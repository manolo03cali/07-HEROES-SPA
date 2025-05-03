// Se importan el reducer de autenticación y los tipos de acciones definidos
import { authReducer, types } from "../../../auth";

// Se define un grupo de pruebas usando Jest
describe("Pruebas en la función reductora authReducer ", () => {
  // Primera prueba: Verifica que el reducer retorne el estado sin cambios si no se envía una acción válida
  test("Debe de retornar el estado por defecto", () => {
    // Estado inicial simulado
    const state = authReducer({ logged: false }, {}); // Se envía una acción vacía

    // Se espera que el estado retornado sea el mismo que el inicial
    expect(state).toEqual({ logged: false });
  });

  // Segunda prueba: Verifica que el reducer maneje correctamente una acción de login
  test("Debe de (login) llamar el login autenticar y establecer el user", () => {
    // Se crea una acción tipo login con información del usuario (payload)
    const action = {
      type: types.login,
      payload: {
        name: "Vladimir",
        id: "123",
      },
    };

    // Se ejecuta el reducer con un estado inicial y la acción de login
    const state = authReducer({ logged: false }, action);

    // Se espera que el nuevo estado indique que el usuario está autenticado y contenga su información
    expect(state).toEqual({ logged: true, user: action.payload });
  });

  // Tercera prueba: Verifica que el reducer maneje correctamente una acción de logout
  test("Debe de (logout) borrar el name del usuario y logged en false", () => {
    // Estado inicial simulado: el usuario ya está logueado
    const state = {
      logged: true,
      user: {
        id: "123",
        name: "Vladimir",
      },
    };

    // Se crea una acción tipo logout (sin payload)
    const action = {
      type: types.logout,
    };

    // Se ejecuta el reducer con el estado actual y la acción de logout
    const newstate = authReducer(state, action);

    // Se espera que el nuevo estado refleje que el usuario ya no está autenticado y no haya datos del usuario
    expect(newstate).toEqual({ logged: false });
  });
});
