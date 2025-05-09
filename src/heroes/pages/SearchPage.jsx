// Importaciones de librerías y componentes necesarios
import { useSearchParams, useNavigate } from "react-router-dom"; // Hooks de React Router v6
import { useForm } from "../../hooks/useForm"; // Hook personalizado para manejar formularios
import { HeroCard } from "../components"; // Componente para mostrar tarjetas de héroes
import { getHeroesByName } from "../helpers"; // Función helper para buscar héroes

export const SearchPage = () => {
  // Hook para navegación programática
  const navigate = useNavigate();

  // Hook para acceder a los parámetros de búsqueda de la URL
  const [searchParams] = useSearchParams();

  // Obtiene el parámetro 'q' de la URL o usa string vacío si no existe
  const q = searchParams.get("q") || "";

  // Obtiene los héroes que coinciden con el término de búsqueda
  const heroes = getHeroesByName(q);

  // Bandera para mostrar mensaje de búsqueda inicial
  const showSearch = q.length === 0;

  // Bandera para mostrar mensaje de error cuando no hay resultados
  const showError = q.length > 0 && heroes.length === 0;

  // Hook personalizado para manejar el estado del formulario
  // Inicializa el campo de búsqueda con el valor de la URL
  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  // Manejador para el evento submit del formulario
  const onSearchSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto
    console.log("Desde testing.. form");
    // Navega a la misma ruta pero con el nuevo término de búsqueda
    // Esto actualizará la URL y disparará un nuevo renderizado
    navigate(`?q=${searchText}`);
  };

  // Renderizado del componente
  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      {/* Contenedor principal con sistema de grid */}
      <div className="row g-2">
        {/* Columna izquierda - Formulario de búsqueda */}
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          {/* Formulario de búsqueda */}
          <form onSubmit={onSearchSubmit} aria-label="form">
            <div className="mb-3">
              {/* Input de búsqueda */}
              <label
                htmlFor="searchInput"
                className="form-label visually-hidden"
              >
                Search a hero
              </label>
              <input
                type="text"
                id="searchInput"
                placeholder="Search a hero"
                className="form-control"
                name="searchText" // Nombre del campo (importante para useForm)
                autoComplete="off" // Desactiva autocompletado
                value={searchText} // Valor controlado por el estado
                onChange={onInputChange} // Manejador de cambios
              />
            </div>
            {/* Botón de submit */}
            <button
              aria-label="btn-search"
              type="submit"
              className="btn btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>

        {/* Columna derecha - Resultados de búsqueda */}
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* Mensaje inicial (se muestra cuando no hay término de búsqueda) */}
          <div
            role="status"
            data-testid="search-message"
            className="alert alert-primary col animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>

          {/* Mensaje de error (se muestra cuando hay búsqueda pero no resultados) */}
          <div
            role="alert"
            data-testid="error-message"
            className="alert alert-danger col animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No hero with <b>{q}</b>
          </div>

          {/* Lista de resultados - Mapea los héroes encontrados a componentes HeroCard */}
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
