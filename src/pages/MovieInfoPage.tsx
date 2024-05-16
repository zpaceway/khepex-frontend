import { useParams } from "react-router-dom";
import { useMovie, useUser } from "../hooks";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";
import { useMemo } from "react";
import { secondsToHoursMinutesAndSeconds } from "../utils";
import NavBar from "../components/NavBar";
import MovieActions from "../components/MovieActions";

const MoviePage = () => {
  const params = useParams<{ movieId: string }>();
  const { user } = useUser();
  const movie = useMovie(params.movieId);
  const durationFormatted = useMemo(() => {
    if (!movie) return;
    return secondsToHoursMinutesAndSeconds(movie.durationInSeconds);
  }, [movie]);
  const isPurchased = useMemo(() => {
    if (!movie || !user) return false;
    return user.purchasedMovieIds.includes(movie.id);
  }, [movie, user]);

  if (movie === undefined || !user) return <LoadingScreen />;
  if (movie === null) return <NotFoundPage />;

  return (
    <div className="zinc-900 flex min-h-screen flex-col bg-zinc-900">
      <NavBar user={user} />
      <div className="z-40 flex h-full min-h-screen w-full flex-col-reverse items-center justify-center overflow-auto pt-16 lg:flex-row">
        <div className="flex w-full items-center justify-center py-16">
          <div className="flex w-full max-w-lg flex-col gap-4 p-4 text-white">
            <div className="flex flex-col">
              <div>
                <span className="text-zinc-400">Duration: </span>
                {movie.year} {durationFormatted?.hours}h{" "}
                {durationFormatted?.minutes}m
              </div>
              <div>
                <span className="text-zinc-400">Genres: </span>
                <span>{movie.genres.join(", ")}</span>
              </div>
              <div>
                <span className="text-zinc-400">Director: </span>
                <span>{movie.director}</span>
              </div>
            </div>
            <div className="text-lg font-medium">{movie.sinopsis}</div>
            <MovieActions movie={movie} isPurchased={isPurchased} />
          </div>
        </div>
        <div className="h-[600px] w-full overflow-hidden">
          <div className="relative h-full w-full">
            <div className="absolute inset-x-0 top-0 z-50 hidden h-40 bg-gradient-to-b from-zinc-900 to-transparent lg:block"></div>
            <div className="absolute inset-x-0 bottom-0 z-50 h-40 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 z-50 hidden w-40 bg-gradient-to-r from-zinc-900 to-transparent lg:block"></div>
            <div className="absolute inset-y-0 right-0 z-50 hidden w-40 bg-gradient-to-l from-zinc-900 to-transparent lg:block"></div>
            <div className="absolute inset-0">
              <img
                src={movie.banner}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
