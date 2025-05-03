import { PublicLayout } from "../ui/";

import { LoginPage } from "../auth";

export const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,

    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
