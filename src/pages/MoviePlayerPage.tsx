import { useParams } from "react-router-dom";
import { useMovies } from "../hooks";
import { useMemo } from "react";
import LoadingPage from "./LoadingPage";
import ReactPlayer from "react-player";

const MoviePlayerPage = () => {
  const { movies } = useMovies();
  const params = useParams<{ movieId: string }>();

  const movie = useMemo(() => {
    if (!movies) return;

    return movies.find((movie) => movie.id === params.movieId);
  }, [movies, params.movieId]);

  if (!movie) return <LoadingPage />;

  return (
    <div className="fixed inset-0 bg-zinc-900">
      <ReactPlayer
        className="h-full w-full"
        width={"100%"}
        height={"100%"}
        url={movie?.trailer}
      />
    </div>
  );
};

export default MoviePlayerPage;
