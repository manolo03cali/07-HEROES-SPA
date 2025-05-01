// Importa useMemo para memorizar valores derivados
import { useMemo } from "react";

// Importa Navigate para redireccionar, useNavigate para navegación programática,
// y useParams para obtener parámetros de la URL
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Importa la función que busca un héroe por su ID
import { getHeroyById } from "../helpers";

// Componente que muestra los detalles de un héroe específico
export const HeroPage = () => {
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();

  // Hook para navegar hacia atrás u otras rutas programáticamente
  const navigate = useNavigate();

  // Memoriza el héroe obtenido por ID mientras el ID no cambie
  const hero = useMemo(() => getHeroyById(id), [id]);

  // Función que permite regresar a la página anterior
  const onNavigateBack = () => {
    navigate(-1); // -1 indica que vuelve una página atrás en el historial
  };

  // Si no se encuentra el héroe, redirige al usuario a la página de Marvel
  if (!hero) {
    return <Navigate to="/marvel" />;
  }

  // Si se encuentra el héroe, muestra su información
  return (
    <div className="row mt-5">
      {/* Columna izquierda con imagen del héroe */}
      <div className="col-4">
        <img
          src={`/heroes/${id}.jpg`} // Ruta de la imagen del héroe
          alt={hero.superhero} // Texto alternativo con el nombre del héroe
          className="img-thumbnail animate__animated animate__fadeInLeft" // Clase Bootstrap para estilo
        />
      </div>

      {/* Columna derecha con detalles del héroe */}
      <div className="col-8">
        <h3>{hero.superhero}</h3>

        {/* Lista con información clave del héroe */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        {/* Personajes asociados */}
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        {/* Botón para regresar */}
        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
