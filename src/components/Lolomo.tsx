import { TLolomo, TUser } from "../types";
import MovieCard from "./MovieCard";

type LolomoSectionProps = {
  user: TUser;
  lolomo: TLolomo;
  onMovieClick: (movieId: string) => void;
};

const LolomoSection = ({ lolomo, user, onMovieClick }: LolomoSectionProps) => {
  return (
    <div className="flex flex-col gap-8 overflow-hidden">
      {lolomo.map(([category, movies]) => {
        return (
          <div key={`category-${category}`} className="z-20">
            <div className="px-4 text-5xl font-bold text-white">{category}</div>
            <div className="mx-4 flex gap-4 overflow-x-auto py-4">
              {movies.map((movie) => (
                <div
                  key={`movie-${category}-${movie.id}`}
                  className="flex w-40 shrink-0 flex-col gap-1 overflow-hidden text-white"
                >
                  <div className="h-60 w-40 overflow-hidden">
                    <MovieCard
                      movie={{
                        ...movie,
                        genres: category ? [category] : movie.genres,
                      }}
                      purchased={user.purchasedMovieIds.includes(movie.id)}
                      onClick={() => onMovieClick(movie.id)}
                      mode="buy"
                    />
                  </div>
                  <div className="truncate text-sm">{movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LolomoSection;
