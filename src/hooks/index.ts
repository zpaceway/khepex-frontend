import { useAtom } from "jotai";
import { moviesAtom, userAtom } from "../atoms";
import { useCallback, useEffect } from "react";
import {
  getCurrentUser,
  getMoviesSortedByRelevance,
  signInWithEmailAndPassword,
  signUpUser,
} from "../api";
import { TUser } from "../types";

export const useAuth = () => {
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
  };
};

export const useMovies = () => {
  const [movies, setMovies] = useAtom(moviesAtom);

  useEffect(() => {
    const handler = async () => {
      if (movies === undefined) {
        const currentMovies = await getMoviesSortedByRelevance();
        setMovies(currentMovies);
      }
    };
    handler();
  }, [movies, setMovies]);

  return { movies };
};
