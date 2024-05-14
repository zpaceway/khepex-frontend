import { useMovies } from "../hooks";
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import LoadingPage from "./LoadingPage";
import { TMovie } from "../types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Debouncer } from "../utils";
import { twMerge } from "tailwind-merge";

type MovieCardProps = {
  movie: TMovie;
  onClick: () => void;
};

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div
      className="flex w-40 shrink-0 cursor-pointer flex-col gap-1 overflow-hidden text-white"
      onClick={onClick}
    >
      <div className="relative h-60 w-40 shrink-0">
        <img
          src={movie.cover}
          className="h-full w-full object-cover shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/no-poster-available.jpg";
          }}
          alt=""
        />
        <div className="absolute inset-x-0 bottom-0 flex h-6 bg-black bg-opacity-50 text-xs backdrop-blur-sm">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1 px-2 py-1">
              <div className="text-rose-500">
                <FaHeart />
              </div>
              <div>{movie.ratings.toFixed(1)}</div>
            </div>
            <div className="bg-purple-500 bg-opacity-50 px-2 py-1">
              {movie.genres[0]}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FaShoppingCart className="shrink-0 text-xs" />
        <div className="truncate text-sm font-medium">{movie.name}</div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { movies, categories } = useMovies();
  const appContainerRef = useRef<HTMLDivElement>(null);
  const [isWindowOnTop, setIsWindowOnTop] = useState(true);
  const debouncerRef = useRef(new Debouncer(50));
  const [promotedMovieId, setPromotedMovieId] = useState<string | undefined>(
    undefined,
  );
  const promotedMovie = useMemo(() => {
    return movies?.find((movie) => movie.id === promotedMovieId);
  }, [movies, promotedMovieId]);

  useEffect(() => {
    if (!movies || promotedMovieId) return;
    setPromotedMovieId(movies[0].id);
  }, [movies, promotedMovieId]);

  useEffect(() => {
    const appContainer = appContainerRef.current;
    if (!appContainer) return;

    const onScroll = () => {
      debouncerRef.current.debounce(() => {
        const scrollY = window.scrollY;
        setIsWindowOnTop(scrollY === 0);
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  if (!movies || !categories || !promotedMovie) return <LoadingPage />;

  return (
    <div ref={appContainerRef} className="flex flex-col gap-8 bg-zinc-900">
      <div
        className={twMerge(
          "fixed top-0 z-50 flex h-16 w-full shrink-0 items-center bg-black px-4 backdrop-blur-sm transition-all lg:px-8",
          isWindowOnTop ? "bg-opacity-30" : "bg-opacity-90",
        )}
      >
        <div className="text-3xl font-black text-purple-400">
          <span>KHE</span>
          <span className="text-lg font-medium text-white">pex</span>
        </div>
      </div>
      <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
          <div className="max-w-[400px] text-4xl font-bold">
            {promotedMovie.name}
          </div>
          <div className="max-w-[400px] text-lg">
            {promotedMovie.description}
          </div>
          <div className="flex gap-2">
            <button className="gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-zinc-500 hover:bg-opacity-80">
              <FaPlay />
              <div>Play</div>
            </button>
            <button className="gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-zinc-500 hover:bg-opacity-80">
              <FaInfoCircle />
              <div>More Info</div>
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        </div>
        <img
          src={promotedMovie.banner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {["", ...categories].map((category) => (
          <div key={`category-${category}`} className="z-20">
            <div className="px-4 text-5xl font-bold text-white">
              {category || "For You"}
            </div>
            <div className="mx-4 flex gap-4 overflow-x-auto py-4">
              {movies
                .filter((movie) => !category || movie.genres.includes(category))
                .map((movie) => (
                  <MovieCard
                    key={`movie-${category}-${movie.id}`}
                    movie={{
                      ...movie,
                      genres: category ? [category] : movie.genres,
                    }}
                    onClick={() => {
                      setPromotedMovieId(movie.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
