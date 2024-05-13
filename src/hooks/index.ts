import { useAtom } from "jotai";
import { userAtom } from "../atoms";
import { useCallback, useEffect } from "react";
import { getCurrentUser, signInWithEmailAndPassword, signUpUser } from "../api";
import { TUser } from "../types";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const signIn = useCallback(
    async (email: string, password: string) => {
      const user = await signInWithEmailAndPassword(email, password);
      if (user) localStorage.setItem("currentUserId", user.id);
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
