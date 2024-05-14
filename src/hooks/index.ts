import { useAtom } from "jotai";
import { moviesAtom, userAtom } from "../atoms";
import { useCallback, useEffect, useState } from "react";
import {
  generateLolomoFromMovies,
  getCurrentUser,
  getMoviesSortedByRelevance,
  purchaseMovieById,
  signInWithEmailAndPassword,
  signUpUser,
} from "../api";
import { TMovie, TUser } from "../types";

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const signIn = useCallback(
    async (email: string, password: string) => {
      const user = await signInWithEmailAndPassword(email, password);
      setUser(user);
      return user;
    },
    [setUser],
  );

  const signUp = useCallback(
    async (newUser: Omit<TUser & { password: string }, "id">) => {
      const user = await signUpUser(newUser);
      setUser(user);
      return user;
    },
    [setUser],
  );

  const purchase = useCallback(
    async (movieId: string) => {
      if (!user) return false;
      const result = await purchaseMovieById(movieId);
      if (!result) return false;
      setUser({
        ...user,
        purchasedMovieIds: [...new Set([...user.purchasedMovieIds, movieId])],
      });
      return true;
    },
    [user, setUser],
  );

  useEffect(() => {
    const handler = async () => {
      if (user === undefined) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    };
    handler();
  }, [setUser, user]);

  return {
    user,
    signIn,
    signUp,
    purchase,
  };
};

export const useMovies = () => {
  const [movies, setMovies] = useAtom(moviesAtom);
  const [lolomo, setLolomo] = useState<[string, TMovie[]][] | undefined>();

  const fetchLolomo = useCallback(
    async (search?: string) => {
      if (!movies) return;
      return generateLolomoFromMovies({ movies, search });
    },
    [movies],
  );

  const refreshLolomo = useCallback(
    (search?: string) => {
      fetchLolomo(search).then((lolomo) => {
        setLolomo(lolomo);
      });
    },
    [fetchLolomo],
  );

  useEffect(() => {
    if (!movies || lolomo) return undefined;
    fetchLolomo().then((lolomo) => setLolomo(lolomo));
  }, [fetchLolomo, lolomo, movies]);

  useEffect(() => {
    const moviesHandler = async () => {
      if (movies === undefined) {
        const currentMovies = await getMoviesSortedByRelevance();
        setMovies(currentMovies);
      }
    };

    moviesHandler();
  }, [movies, setMovies]);

  return { movies, lolomo, refreshLolomo };
};
