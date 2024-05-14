import { useAuth, useMovies } from "../hooks";
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import LoadingPage from "./LoadingPage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Debouncer } from "../utils";
import { twMerge } from "tailwind-merge";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";

const DashboardPage = () => {
  const { lolomo, refreshLolomo } = useMovies();
  const { user } = useAuth();
  const appContainerRef = useRef<HTMLDivElement>(null);
  const [isWindowOnTop, setIsWindowOnTop] = useState(true);
  const [search, setSearch] = useState("");
  const scrollDebouncerRef = useRef(new Debouncer(50));
  const searchDebouncerRef = useRef(new Debouncer(200));
  const [promotedMovieId, setPromotedMovieId] = useState<string | undefined>(
    undefined,
  );
  const promotedMovie = useMemo(() => {
    const promotedMovie = lolomo?.[0]?.[1]?.find(
      (movie) => movie.id === promotedMovieId,
    );
    if (!promotedMovie) return lolomo?.[0]?.[1]?.[0];
    return promotedMovie;
  }, [lolomo, promotedMovieId]);

  useEffect(() => {
    if (!lolomo || promotedMovieId) return;
    setPromotedMovieId(lolomo[0]?.[1]?.[0].id);
  }, [lolomo, promotedMovieId]);

  useEffect(() => {
    const appContainer = appContainerRef.current;
    if (!appContainer) return;

    const onScroll = () => {
      scrollDebouncerRef.current.debounce(() => {
        const scrollY = window.scrollY;
        setIsWindowOnTop(scrollY === 0);
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  useEffect(() => {
    searchDebouncerRef.current.debounce(() => {
      refreshLolomo(search);
    });
  }, [refreshLolomo, search]);

  if (!lolomo || !user) return <LoadingPage />;

  return (
    <div ref={appContainerRef} className="flex flex-col gap-8 bg-zinc-900">
      <NavBar
        isWindowOnTop={isWindowOnTop}
        onSearchChange={(newSearch) => setSearch(newSearch)}
        search={search}
        user={user}
      />
      {!promotedMovie ? (
        <div className="flex h-screen w-full items-center justify-center text-6xl text-white">
          No results were found
        </div>
      ) : (
        <>
          <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
            <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
              <div className="max-w-[400px] text-4xl font-bold">
                {promotedMovie.title}
              </div>
              <div className="max-w-[400px] text-lg">
                {promotedMovie.description}
              </div>
              <div className="flex gap-2">
                <button
                  className={twMerge(
                    "gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-opacity-80",
                    user.purchasedMovieIds.includes(promotedMovie.id)
                      ? "bg-purple-500"
                      : "bg-emerald-500",
                  )}
                >
                  <div className="flex items-center gap-1">
                    {user.purchasedMovieIds.includes(promotedMovie.id) ? (
                      <FaPlay className="shrink-0" />
                    ) : (
                      <FaShoppingCart className="shrink-0" />
                    )}

                    <div className="">
                      {user.purchasedMovieIds.includes(promotedMovie.id)
                        ? "Play"
                        : (promotedMovie.priceInCents / 100).toFixed(2)}
                    </div>
                  </div>
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
          <div className="flex flex-col gap-8 overflow-hidden">
            {lolomo.map(([category, movies]) => (
              <div key={`category-${category}`} className="z-20">
                <div className="px-4 text-5xl font-bold text-white">
                  {category}
                </div>
                <div className="mx-4 flex gap-4 overflow-x-auto py-4">
                  {movies.map((movie) => (
                    <MovieCard
                      key={`movie-${category}-${movie.id}`}
                      movie={{
                        ...movie,
                        genres: category ? [category] : movie.genres,
                      }}
                      purchased={user.purchasedMovieIds.includes(movie.id)}
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
        </>
      )}
    </div>
  );
};

export default DashboardPage;
