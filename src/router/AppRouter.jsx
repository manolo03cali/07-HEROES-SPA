// import { createBrowserRouter } from "react-router-dom";
// import { PublicLayout, PrivateLayout } from "../ui";
// import { MarvelPage, DCPage, ErrorPage } from "../heroes";
// import { LoginPage } from "../auth";

// // Definición de rutas
// export const AppRouter = createBrowserRouter([
//   {
//     element: <PublicLayout />,
//     children: [
//       { path: "/", element: <MarvelPage /> },
//       { path: "marvel", element: <MarvelPage /> },
//       { path: "dc", element: <DCPage /> },
//     ],
//   },
//   {
//     element: <PrivateLayout />,
//     children: [
//       { path: "login", element: <LoginPage /> },
//       //  { path: "/profile", element: <ProfilePage /> },
//     ],
//   },
//   { path: "*", element: <ErrorPage /> }, // 404
// ]);
//la implementación comentada sirve si no hay una estructura de rutas muy grande
import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./";

export const AppRouter = createBrowserRouter(appRoutes);
