// Importamos el componente 'HeroList' desde la carpeta '../components'
import { HeroList } from "../components";

// Exportamos un componente funcional llamado 'DCPage'
export const DCPage = () => {
  // El componente retorna JSX que se va a renderizar en pantalla
  return (
    <>
      {/* Título principal de la página */}
      <h1>DC Comics</h1>

      {/* Línea horizontal de separación */}
      <hr />

      {/* Lista desordenada que contiene el listado de héroes */}
      <ul className="container">
        {/* Renderizamos el componente 'HeroList' pasando "DC Comics" como propiedad 'publisher' */}
        {/* Esto significa que dentro de 'HeroList' solo se mostrarán los héroes de DC Comics */}
        <HeroList publisher="DC Comics" />
      </ul>
    </>
  );
};
