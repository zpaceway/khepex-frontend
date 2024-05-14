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
    genres: ["Drama"],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "2",
    name: "The Godfather",
    banner: "/movies/The Godfather/banner.jpg",
    cover: "/movies/The Godfather/cover.jpg",
    ratings: 9.2,
    durationInSeconds: 10500,
    director: "Francis Ford Coppola",
    year: 1972,
    genres: ["Crime", "Drama"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "3",
    name: "The Dark Knight",
    banner: "/movies/The Dark Knight/banner.jpg",
    cover: "/movies/The Dark Knight/cover.jpg",
    ratings: 9.0,
    durationInSeconds: 9120,
    director: "Christopher Nolan",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
  },
  {
    id: "4",
    name: "Pulp Fiction",
    banner: "/movies/Pulp Fiction/banner.jpg",
    cover: "/movies/Pulp Fiction/cover.jpg",
    ratings: 8.9,
    durationInSeconds: 9480,
    director: "Quentin Tarantino",
    year: 1994,
    genres: ["Crime", "Drama"],
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: "5",
    name: "Forrest Gump",
    banner: "/movies/Forrest Gump/banner.jpg",
    cover: "/movies/Forrest Gump/cover.jpg",
    ratings: 8.8,
    durationInSeconds: 8520,
    director: "Robert Zemeckis",
    year: 1994,
    genres: ["Drama", "Romance"],
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
  },
  {
    id: "6",
    name: "Inception",
    banner: "/movies/Inception/banner.jpg",
    cover: "/movies/Inception/cover.jpg",
    ratings: 8.8,
    durationInSeconds: 8880,
    director: "Christopher Nolan",
    year: 2010,
    genres: ["Action", "Adventure", "Sci-Fi"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  },
];
