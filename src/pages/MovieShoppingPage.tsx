import { useParams } from "react-router-dom";
import { useMovies } from "../hooks";
import { useMemo } from "react";
import LoadingScreen from "../components/LoadingScreen";

const MovieShoppingPage = () => {
  const { movies } = useMovies();
  const params = useParams<{ movieId: string }>();

  const movie = useMemo(() => {
    if (!movies) return;

    return movies.find((movie) => movie.id === params.movieId);
  }, [movies, params.movieId]);

  if (!movie) return <LoadingScreen />;

  return <div>shopping from {movie.title}</div>;
};

export default MovieShoppingPage;
