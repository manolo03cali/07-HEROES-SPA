// Importamos el componente Link de react-router-dom para navegar entre rutas sin recargar la página
import { Link } from "react-router-dom";

// Componente que muestra los personajes secundarios solo si son diferentes del alter ego
const CharactersByHero = ({ alter_ego, characters }) => {
  // Si alter_ego y characters son iguales, no se renderiza nada (evita repetir información)
  return alter_ego === characters ? <></> : <p>{characters}</p>;
};

// Componente principal que representa una tarjeta de héroe
export const HeroCard = ({
  id, // ID del héroe (usado para cargar la imagen)
  superhero, // Nombre del superhéroe
  publisher, // Editorial (por ejemplo: DC Comics, Marvel)
  alter_ego, // Alter ego del héroe
  first_appearance, // Primera aparición del personaje
  characters, // Otros personajes relacionados con el héroe
}) => {
  // Ruta de la imagen del héroe (se construye dinámicamente con su ID)
  const herImageUrl = `/heroes/${id}.jpg`;

  return (
    <>
      {/* Columna del grid de Bootstrap */}
      <div className="col animate__animated animate__fadeIn" key={id}>
        <div className="card">
          {/* Fila interna para dividir la tarjeta en imagen y contenido */}
          <div className="row no-gutters">
            {/* Columna para la imagen (toma el 33% del ancho) */}
            <div className="col-4 ">
              <img src={herImageUrl} className="card-img" alt={superhero} />
            </div>

            {/* Columna para el contenido (toma el 66% del ancho) */}
            <div className="col-8">
              <div className="card-body">
                {/* Nombre del superhéroe */}
                <h5 className="card-title">{superhero}</h5>

                {/* Alter ego */}
                <p className="card-text">{alter_ego}</p>

                {/* Componente condicional para mostrar los personajes secundarios */}
                <CharactersByHero
                  characters={characters}
                  alter_ego={alter_ego}
                />

                {/* Primera aparición */}
                <p className="card-text">
                  <small className="text-muted">{first_appearance}</small>
                </p>

                {/* Enlace para ver más detalles del héroe */}
                <Link to={`/hero/${id}`}>Más..</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
