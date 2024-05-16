import { useParams } from "react-router-dom";
import { useMovie } from "../hooks";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";

const MoviePage = () => {
  const params = useParams<{ movieId: string }>();
  const movie = useMovie(params.movieId);

  if (movie === undefined) return <LoadingScreen />;
  if (movie === null) return <NotFoundPage />;

  return <div>info from {movie.title}</div>;
};

export default MoviePage;
