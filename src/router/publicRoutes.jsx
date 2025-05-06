import { PublicLayout } from "../ui/";

import { LoginPage } from "../auth";

export const publicRoutes = [
  {
    element: <PublicLayout />,

    children: [
      { path: "/", element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      // { path: "*", element: <ErrorPage /> },
    ],
  },
];
