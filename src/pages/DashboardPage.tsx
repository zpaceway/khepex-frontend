import { useUser, useMovies } from "../hooks";
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useMemo, useRef, useState } from "react";
import { Debouncer } from "../utils";
import { twMerge } from "tailwind-merge";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const DashboardPage = () => {
  const { lolomo, refreshLolomo } = useMovies();
  const { user } = useUser();
  const navigate = useNavigate();
  const appContainerRef = useRef<HTMLDivElement>(null);
  const [isWindowOnTop, setIsWindowOnTop] = useState(true);
  const [search, setSearch] = useState("");
  const scrollDebouncerRef = useRef(new Debouncer(50));
  const searchDebouncerRef = useRef(new Debouncer(200));
  const [bannerMovieId, setBannerMovieId] = useState<string | undefined>(
    undefined,
  );
  const bannerMovie = useMemo(() => {
    const newBannerMovie = lolomo?.[0]?.[1]?.find(
      (movie) => movie.id === bannerMovieId,
    );
    if (!newBannerMovie) return lolomo?.[0]?.[1]?.[0];
    return newBannerMovie;
  }, [lolomo, bannerMovieId]);

  useEffect(() => {
    if (!lolomo || bannerMovieId) return;
    setBannerMovieId(lolomo[0]?.[1]?.[0].id);
  }, [lolomo, bannerMovieId]);

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

  if (!lolomo || !user) return <LoadingScreen />;

  return (
    <div ref={appContainerRef} className="flex flex-col gap-8 bg-zinc-900">
      <NavBar
        isWindowOnTop={isWindowOnTop}
        onSearchChange={(newSearch) => setSearch(newSearch)}
        search={search}
        user={user}
      />
      {!bannerMovie ? (
        <div className="flex h-screen w-full items-center justify-center text-6xl text-white">
          No results were found
        </div>
      ) : (
        <>
          <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
            <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
              <div className="flex max-w-[400px] gap-2 text-4xl font-bold">
                <div>{bannerMovie.title}</div>
                {!user.purchasedMovieIds.includes(bannerMovie.id) && (
                  <div className="flex flex-col">
                    <button
                      className="flex items-center justify-center gap-2 rounded-md bg-emerald-500 bg-opacity-60 px-4 py-2 text-sm transition-all hover:bg-opacity-80"
                      onClick={() => {
                        navigate(`/rent/${bannerMovie.id}`);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <FaEye className="shrink-0" />

                        <div className="">Rent</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="max-w-[400px] text-lg">
                {bannerMovie.description}
              </div>
              <div className="flex gap-2">
                <button
                  className={twMerge(
                    "flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-opacity-80",
                    user.purchasedMovieIds.includes(bannerMovie.id)
                      ? "bg-purple-500"
                      : "bg-emerald-500",
                  )}
                  onClick={() => {
                    if (user.purchasedMovieIds.includes(bannerMovie.id)) {
                      return navigate(`/play/${bannerMovie.id}`);
                    }
                    navigate(`/buy/${bannerMovie.id}`);
                  }}
                >
                  <div className="flex items-center gap-1">
                    {user.purchasedMovieIds.includes(bannerMovie.id) ? (
                      <FaPlay className="shrink-0" />
                    ) : (
                      <FaShoppingCart className="shrink-0" />
                    )}

                    <div className="">
                      {user.purchasedMovieIds.includes(bannerMovie.id)
                        ? "Play"
                        : (bannerMovie.purchasePriceInCents / 100).toFixed(2)}
                    </div>
                  </div>
                </button>
                <button
                  className="gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-zinc-500 hover:bg-opacity-80"
                  onClick={() => {
                    navigate(`/movie/${bannerMovie.id}`);
                  }}
                >
                  <FaInfoCircle />
                  <div>More Info</div>
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
            <img
              src={bannerMovie.banner}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-8 overflow-hidden">
            {lolomo.map(([category, movies]) => {
              if (category === "For You" && search) return;
              return (
                <div key={`category-${category}`} className="z-20">
                  <div className="px-4 text-5xl font-bold text-white">
                    {category}
                  </div>
                  <div className="mx-4 flex gap-4 overflow-x-auto py-4">
                    {movies.map((movie) => (
                      <div className="flex w-40 shrink-0 flex-col gap-1 overflow-hidden text-white">
                        <div className="h-60 w-40 overflow-hidden">
                          <MovieCard
                            key={`movie-${category}-${movie.id}`}
                            movie={{
                              ...movie,
                              genres: category ? [category] : movie.genres,
                            }}
                            purchased={user.purchasedMovieIds.includes(
                              movie.id,
                            )}
                            onClick={() => {
                              setBannerMovieId(movie.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
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
        </>
      )}
    </div>
  );
};

export default DashboardPage;
