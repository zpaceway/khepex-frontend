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
    let mounted = true;
    const handler = async () => {
      if (user === undefined && mounted) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    };
    handler().catch(console.error);

    return () => {
      mounted = false;
    };
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
  const [user] = useAtom(userAtom);
  const [lolomo, setLolomo] = useState<[string, TMovie[]][] | undefined>();

  const fetchLolomo = useCallback(
    async (search?: string) => {
      if (!movies || !user) return;
      return generateLolomoFromMovies({ movies, user, search });
    },
    [movies, user],
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
    fetchLolomo()
      .then((lolomo) => setLolomo(lolomo))
      .catch(console.error);
  }, [fetchLolomo, lolomo, movies]);

  useEffect(() => {
    let mounted = true;
    const handler = async () => {
      if (movies === undefined && mounted) {
        const currentMovies = await getMoviesSortedByRelevance();
        setMovies(currentMovies);
      }
    };
    handler().catch(console.error);

    return () => {
      mounted = false;
    };
  }, [movies, setMovies]);

  return { movies, lolomo, refreshLolomo };
};
