// Importa el arreglo de héroes desde el archivo "../data/heroes"
import { heroes } from "../data/heroes";

// Exporta una función llamada getHeroesByName que recibe un parámetro 'name'
// Si no se pasa ningún valor, 'name' será una cadena vacía por defecto
export const getHeroesByName = (name = "") => {
  // Convierte 'name' a minúsculas y elimina espacios en blanco al inicio y al final
  name = name.toLocaleLowerCase().trim();

  // Si la cadena 'name' está vacía después de limpiar, retorna un arreglo vacío
  if (name.length === 0) return [];

  // Filtra el arreglo 'heroes' para encontrar los héroes cuyo nombre ('superhero')
  // incluya la cadena 'name'. También convierte cada nombre a minúsculas
  // para que la búsqueda no sea sensible a mayúsculas/minúsculas
  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
