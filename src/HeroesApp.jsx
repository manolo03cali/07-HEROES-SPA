import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter"; // Asegúrate de importar el router
import { AuthProvider } from "./auth";

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  );
};
