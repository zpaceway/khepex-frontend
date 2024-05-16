import { atom } from "jotai";
import { TUser } from "../types";

export const userAtom = atom<undefined | null | TUser>(undefined);
