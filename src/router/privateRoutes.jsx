import { PrivateLayout } from "../ui/";

import { MarvelPage, DCPage, SearchPage, HeroPage, ErrorPage } from "../heroes";
import { Navigate } from "react-router-dom";

export const privateRoutes = [
  {
    element: <PrivateLayout />,
    children: [
      { path: "marvel", element: <MarvelPage /> },
      { path: "dc", element: <DCPage /> },
      { index: true, element: <Navigate to="marvel" replace /> },
      { path: "search", element: <SearchPage /> },
      { path: "hero/:id", element: <HeroPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
