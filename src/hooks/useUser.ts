import { useAtom } from "jotai";
import { userAtom } from "../atoms";
import { useCallback, useEffect } from "react";
import {
  getCurrentUser,
  purchaseMovieById,
  signInWithEmailAndPassword,
  signUpUser,
} from "../api";
import { TUser } from "../types";

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
