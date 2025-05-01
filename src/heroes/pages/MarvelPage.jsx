// Importamos el componente 'HeroList' desde la carpeta '../components'
import { HeroList } from "../components";

// Exportamos un componente funcional llamado 'MarvelPage'
export const MarvelPage = () => {
  // El componente devuelve JSX que se renderiza en la página
  return (
    <>
      {/* Título principal que indica que estamos en la página de Marvel */}
      <h1>Marvel Comics</h1>

      {/* Línea horizontal para separar visualmente el contenido */}
      <hr />

      {/* Lista desordenada donde se va a mostrar el listado de héroes */}
      <ul className="container">
        {/* Renderizamos el componente 'HeroList' pasando como propiedad 'publisher' el valor "Marvel Comics" */}
        {/* Esto indica que dentro de 'HeroList' se deben mostrar únicamente los héroes de Marvel Comics */}
        <HeroList publisher="Marvel Comics" />
      </ul>
    </>
  );
};
