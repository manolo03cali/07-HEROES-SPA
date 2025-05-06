// Importa `useMemo` para memorizar valores derivados y evitar cálculos innecesarios
import { useMemo } from "react";

// Importa:
// - `Navigate` para redireccionar a otra ruta.
// - `useNavigate` para cambiar rutas programáticamente.
// - `useParams` para obtener parámetros dinámicos de la URL (como el ID del héroe).
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Importa la función que obtiene un héroe según su ID
import { getHeroyById } from "../helpers";

// Componente que muestra los detalles de un héroe específico
export const HeroPage = () => {
  // Extrae el parámetro 'id' de la URL usando `useParams`
  const { id } = useParams();

  // Hook para realizar navegación programática (como ir hacia otra ruta)
  const navigate = useNavigate();

  // Memoriza el resultado de `getHeroyById(id)` y solo lo vuelve a calcular si cambia el `id`
  // Esto mejora el rendimiento al evitar llamadas innecesarias a la función
  const hero = useMemo(() => getHeroyById(id), [id]);

  // Función para manejar el evento de regresar a la pantalla anterior
  // Si el publisher es "Marvel Comics", redirige a "/marvel"; si no, a "/dc"
  // `replace: true` evita que se agregue una nueva entrada en el historial (reemplaza la actual)
  const onNavigateBack = () => {
    const fallback = hero.publisher === "Marvel Comics" ? "/marvel" : "/dc";
    navigate(fallback, { replace: true });
  };

  // Si no se encuentra el héroe (es `null` o `undefined`), redirige a la página de Marvel
  if (!hero) {
    return <Navigate to="/marvel" />;
  }

  // Si el héroe existe, se muestra su información en pantalla
  return (
    <div className="row mt-5">
      {/* Columna izquierda: Imagen del héroe */}
      <div className="col-4">
        <img
          src={`/heroes/${id}.jpg`} // Ruta de la imagen del héroe
          alt={hero.superhero} // Texto alternativo accesible
          className="img-thumbnail animate__animated animate__fadeInLeft" // Estilos con animación de entrada
        />
      </div>

      {/* Columna derecha: Detalles del héroe */}
      <div className="col-8">
        {/* Nombre del superhéroe */}
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

        {/* Sección de personajes secundarios */}
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        {/* Botón para regresar a la categoría del héroe */}
        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
