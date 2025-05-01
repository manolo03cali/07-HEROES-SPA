import { publicRoutes } from "../router/publicRoutes";
import { privateRoutes } from "../router/privateRoutes";
//import { ErrorPage } from "../heroes";

export const appRoutes = [
  ...publicRoutes,
  ...privateRoutes,
  //{ path: "*", element: <ErrorPage /> }, // Ruta 404
];
