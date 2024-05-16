import { useUser, useLolomo } from "../hooks";

import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useMemo, useRef, useState } from "react";
import { Debouncer } from "../utils";
import NavBar from "../components/NavBar";
import MovieBanner from "../components/MovieBanner";
import LolomoSection from "../components/LolomoSection";
import { FOR_YOU_CATEGORY } from "../constants";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { lolomo, refreshLolomo } = useLolomo();
  const { user } = useUser();
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
  const isBannerMoviePurchased = useMemo(() => {
    if (!bannerMovie || !user) return false;
    return user.purchasedMovieIds.includes(bannerMovie.id);
  }, [bannerMovie, user]);

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
        <div className="flex h-screen w-full items-center justify-center px-4 text-4xl font-medium text-white lg:px-8">
          No results were found...
        </div>
      ) : (
        <div className="flex flex-col">
          <MovieBanner
            movie={bannerMovie}
            isPurchased={isBannerMoviePurchased}
          />
          <LolomoSection
            lolomo={lolomo.filter(
              ([category, movies]) =>
                movies.length > 0 && (category !== FOR_YOU_CATEGORY || !search),
            )}
            user={user}
            onMovieClick={(movieId) => {
              navigate(`movie/${movieId}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
