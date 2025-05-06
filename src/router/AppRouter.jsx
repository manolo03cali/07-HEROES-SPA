// Importa la función `createBrowserRouter` desde React Router,
// que se usa para crear un router basado en el historial del navegador.
import { createBrowserRouter } from "react-router-dom";

// Importa las rutas de la aplicación, definidas en otro archivo (probablemente un array de objetos de rutas).
import { appRoutes } from "./";

// Crea el enrutador principal de la aplicación usando las rutas importadas.
// `createBrowserRouter` construye un enrutador que entiende las rutas definidas en `appRoutes`
// y se encarga de mostrar los componentes correspondientes según la URL.
export const AppRouter = createBrowserRouter(appRoutes);
