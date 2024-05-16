import { atom } from "jotai";
import { TLolomo, TUser } from "../types";

export const userAtom = atom<undefined | null | TUser>(undefined);
export const lolomoAtom = atom<undefined | TLolomo>(undefined);
