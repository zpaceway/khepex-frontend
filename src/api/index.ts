import { FOR_YOU_CATEGORY, YOUR_MOVIES_CATEGORY } from "../constants";
import { TLolomo, TMovie, TUser } from "../types";
import {
  _getMovies,
  _getUserByEmailAndPassword,
  _getUserById,
  _signUpUserWithEmailAndPassword,
} from "./__mock__";

export const getCurrentUser = async (): Promise<TUser | null> => {
  const currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) return null;
  return _getUserById(currentUserId);
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<TUser | null> => {
  const user = await _getUserByEmailAndPassword(email, password);

  if (user) {
    localStorage.setItem("currentUserId", user.id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      purchasedMovieIds: user.purchasedMovieIds,
    };
  }

  return null;
};

export const signUpUser = async (
  user: Omit<TUser & { password: string }, "id">,
): Promise<TUser | null> => {
  const userId = await _signUpUserWithEmailAndPassword(
    user.email,
    user.password,
  );

  if (!userId) return null;

  localStorage.removeItem("currentUserId");

  return {
    id: userId,
    ...user,
  };
};

export const getMoviesSortedByRelevance = async () => {
  const movies = await _getMovies();
  return movies;
};

export const generateLolomoFromMovies = async ({
  movies,
  user,
  search,
}: {
  movies: TMovie[];
  user: TUser;
  search?: string;
}): Promise<TLolomo> => {
  const filteredMovies = movies.filter((movie) => {
    const isMovieOnSearch =
      !search ||
      movie.title
        .replace(/ /g, "")
        .toLowerCase()
        .includes(search.replace(/ /g, "").toLowerCase()) ||
      movie.genres.some((genre) => {
        return genre
          .replace(/ /g, "")
          .toLowerCase()
          .includes(search.replace(/ /g, "").toLowerCase());
      });

    return isMovieOnSearch;
  });

  const categories = [
    ...new Set(filteredMovies.map((movie) => movie.genres).flat()),
  ].sort();

  const extraLists = [FOR_YOU_CATEGORY, YOUR_MOVIES_CATEGORY];

  return [...extraLists, ...categories].map((category) => {
    return [
      category,
      filteredMovies.filter((movie) => {
        const isForYouCategory = category === FOR_YOU_CATEGORY;
        if (isForYouCategory) return true;

        const isYourMoviesCategory = category === YOUR_MOVIES_CATEGORY;
        if (isYourMoviesCategory)
          return user.purchasedMovieIds.includes(movie.id);

        const doesGenreIncludes = movie.genres.includes(category);
        if (doesGenreIncludes) return true;

        return false;
      }),
    ];
  });
};

export const purchaseMovieById = async (movieId: string) => {
  const movies = await _getMovies();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) return false;

  return true;
};
