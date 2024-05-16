import { TMovie, TUser } from "../types";
import { shuffleItems } from "../utils";

export const _getUsers = async () => {
  const response = await fetch("/api/users.json");
  return (await response.json()) as (TUser & { password: string })[];
};
export const _getMovies = async () => {
  const response = await fetch("/api/movies.json");
  const movies = (await response.json()) as TMovie[];
  shuffleItems(movies);
  return movies;
};

export const _getUserById = async (userId: string): Promise<TUser | null> => {
  const users = await _getUsers();
  const user = users.find((user) => user.id === userId);

  if (user)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      purchasedMovieIds: user.purchasedMovieIds,
    };

  return null;
};

export const _getUserByEmailAndPassword = async (
  email: string,
  password: string,
): Promise<TUser | null> => {
  const users = await _getUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (user)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      purchasedMovieIds: user.purchasedMovieIds,
    };

  return null;
};

export const _signUpUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!password) return null;
  const users = await _getUsers();

  const userWithSameEmail = users.find((_user) => {
    return _user.email === email;
  });

  if (userWithSameEmail) return null;

  return crypto.randomUUID() as string;
};
