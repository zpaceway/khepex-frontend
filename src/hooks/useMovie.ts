import { useEffect, useState } from "react";
import { getMovieById } from "../api";
import { TMovie } from "../types";

export const useMovie = (movieId?: string) => {
  const [movie, setMovie] = useState<TMovie | null | undefined>();

  useEffect(() => {
    if (!movieId) return;
    let mounted = true;

    getMovieById(movieId).then((movie) => {
      if (mounted) {
        setMovie(movie);
      }
    });

    return () => {
      mounted = false;
    };
  }, [movieId]);

  return movie;
};
