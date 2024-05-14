import { TMovie, TUser } from "../types";

export const users: (TUser & { password: string })[] = [
  {
    id: "1",
    email: "alexandrotapiaflores@gmail.com",
    name: "Alexandro Tapia",
    password: "123456",
  },
  {
    id: "2",
    email: "alexandro@zpaceway.com",
    name: "Andrés Tapia",
    password: "AABBCC",
  },
];

export const movies: TMovie[] = [
  {
    id: "1",
    name: "The Shawshank Redemption",
    banner: "/movies/The Shawshank Redemption/banner.jpg",
    cover: "/movies/The Shawshank Redemption/cover.jpg",
    ratings: 9.3,
    durationInSeconds: 8520,
    director: "Frank Darabont",
    year: 1994,
    genre: "Drama",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
];
