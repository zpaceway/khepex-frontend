import { atom } from "jotai";
import { TMovie, TUser } from "../types";

export const userAtom = atom<undefined | null | TUser>(undefined);
export const moviesAtom = atom<undefined | TMovie[]>(undefined);
