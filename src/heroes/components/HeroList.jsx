// Importa la función que obtiene héroes filtrados por 'publisher' (editorial como Marvel o DC)
import { getHeroesByPublisher } from "../helpers";

// Importa el hook useMemo de React para optimizar el rendimiento
import { useMemo } from "react";

// Importa el componente que muestra la tarjeta individual de cada héroe
import { HeroCard } from "./HeroCard";

// Componente HeroList: muestra una lista de héroes de acuerdo al publisher recibido como prop
export const HeroList = ({ publisher }) => {
  // useMemo memoriza el resultado de getHeroesByPublisher para no recalcularlo en cada render
  // Solo se vuelve a ejecutar cuando cambia la prop 'publisher'
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  // Si la lista de héroes está vacía, se muestra un mensaje de advertencia
  if (heroes.length === 0) {
    return <p>No se encontraron héroes en este publisher</p>;
  }

  // Si hay héroes, se muestra una grilla con Bootstrap:
  // - 1 columna en pantallas pequeñas (row-cols-1)
  // - 3 columnas en pantallas medianas en adelante (row-cols-md-3)
  // - g-3 agrega espacio (gutter) entre las columnas
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {
        // Mapea cada héroe y renderiza su tarjeta
        // Se usa el operador spread (...) para pasar todas las propiedades de 'hero' al HeroCard
        heroes.map((hero) => (
          <HeroCard key={hero.id} {...hero} />
        ))
      }
    </div>
  );
};
