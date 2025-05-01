import { heroes } from "../data/heroes";
export const getHeroyById = (id) => {
  return heroes.find((hero) => hero.id === id);
};
