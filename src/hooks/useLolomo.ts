import { useAtom } from "jotai";
import { lolomoAtom, userAtom } from "../atoms";
import { useCallback } from "react";
import { generateLolomo } from "../api";

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
