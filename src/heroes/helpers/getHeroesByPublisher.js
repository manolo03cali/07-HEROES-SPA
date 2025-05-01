// Importamos el arreglo 'heroes' desde el archivo '../data/heroes'
import { heroes } from "../data/heroes";

// Exportamos una función llamada 'getHeroesByPublisher' que recibe como parámetro 'publisher'
export const getHeroesByPublisher = (publisher) => {
  // Definimos un arreglo con los nombres de los publishers válidos
  const validPublishers = ["DC Comics", "Marvel Comics"];

  // Verificamos si el publisher recibido no está en la lista de publishers válidos
  if (!validPublishers.includes(publisher)) {
    // Si no es válido, lanzamos un error indicando que el publisher no es válido
    throw new Error(`${publisher} is no valid publisher`);
  }

  // Si el publisher es válido, filtramos el arreglo de 'heroes'
  // Devolvemos un nuevo arreglo solo con los héroes cuyo 'publisher' sea igual al recibido
  return heroes.filter((heroe) => heroe.publisher === publisher);
};
