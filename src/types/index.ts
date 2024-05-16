import { z } from "zod";
import { signInFormSchema, signUpFormSchema } from "../schemas";

export type TUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  purchasedMovieIds: string[];
};

export type TMovie = {
  id: string;
  title: string;
  banner: string;
  cover: string;
  ratings: number;
  durationInSeconds: number;
  director: string;
  year: number;
  genres: string[];
  description: string;
  sinopsis: string;
  purchasePriceInCents: number;
  rentPriceInCents: number;
  trailer: string;
};

export type TLolomo = [string, TMovie[]][];

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
