import { useAtom } from "jotai";
import { lolomoAtom, userAtom } from "../atoms";
import { useCallback, useEffect, useState } from "react";
import {
  generateLolomo as generateLolomo,
  getCurrentUser,
  getMovieById,
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

export const useLolomo = () => {
  const [user] = useAtom(userAtom);
  const [lolomo, setLolomo] = useAtom(lolomoAtom);

  const fetchLolomo = useCallback(
    async (search?: string) => {
      if (!user) return;
      return generateLolomo({ user, search });
    },
    [user],
  );

  const refreshLolomo = useCallback(
    (search?: string) => {
      fetchLolomo(search).then((lolomo) => {
        setLolomo(lolomo);
      });
    },
    [fetchLolomo, setLolomo],
  );

  return { lolomo, refreshLolomo };
};

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
