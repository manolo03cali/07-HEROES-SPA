import { PrivateLayout } from "../ui/";

import { MarvelPage, DCPage, SearchPage, HeroPage, ErrorPage } from "../heroes";

export const privateRoutes = [
  {
    element: <PrivateLayout />,
    children: [
      { path: "marvel", element: <MarvelPage /> },
      { path: "dc", element: <DCPage /> },
      { path: "/", element: <DCPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "hero/:id", element: <HeroPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
