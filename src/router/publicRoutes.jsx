import { PublicLayout } from "../ui/";

import { LoginPage } from "../auth";

export const publicRoutes = [
  {
    element: <PublicLayout />,

    children: [{ path: "login", element: <LoginPage /> }],
  },
];
