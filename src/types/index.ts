export type TUser = {
  id: string;
  name: string;
  email: string;
  purchasedMovieIds: string[];
};

export type TMovie = {
  id: string;
  name: string;
  banner: string;
  cover: string;
  ratings: number;
  durationInSeconds: number;
  director: string;
  year: number;
  genres: string[];
  description: string;
  priceInCents: number;
};
