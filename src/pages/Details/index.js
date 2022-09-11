import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "./styles";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const image_path = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetch(
      //Informe a Chave que a API Disponibiliza
      `https://api.themoviedb.org/3/movie/${id}popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        const { title, poster_path, release_date, overview } = data;
        const movie = {
          id,
          title,
          image: `${image_path}${poster_path}`,
          sinopse: overview,
          releaseDate: release_date.split("-").reverse().join("/"),
        };
        setMovie(movie);
      });
  }, [id]);

  return (
    <Container>
      <div className="movie">
        <img src={movie.image} alt={movie.sinopse} />
        <div className="details">
          <h1>{movie.title}</h1>
          <span>Sinopse: {movie.sinopse}</span>
          <span className="release-date">
            Data de Lançamento: {movie.releaseDate}
          </span>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
export default Details;
