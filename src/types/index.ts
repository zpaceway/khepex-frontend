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
  priceInCents: number;
  trailer: string;
};
