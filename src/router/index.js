import { publicRoutes } from "../router/publicRoutes";
import { privateRoutes } from "../router/privateRoutes";

export const appRoutes = [...publicRoutes, ...privateRoutes];
