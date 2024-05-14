import { movies, users } from "../__mock__";
import { TMovie, TUser } from "../types";
import { delay, shuffleItems } from "../utils";

const MOCKED_BACKEND_TIMEOUT_IN_MS = 200;

export const getCurrentUser = async (): Promise<TUser | null> => {
  await delay(MOCKED_BACKEND_TIMEOUT_IN_MS);
  const currentUserId = localStorage.getItem("currentUserId");
  if (currentUserId) {
    const user = users.find((user) => user.id === currentUserId);
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        purchasedMovieIds: user.purchasedMovieIds,
      };
    }

    return null;
  }
  return null;
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<TUser | null> => {
  await delay(MOCKED_BACKEND_TIMEOUT_IN_MS);
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });

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
  await delay(MOCKED_BACKEND_TIMEOUT_IN_MS);
  const userId = crypto.randomUUID() as string;

  const userWithSameEmail = users.find((_user) => {
    return _user.email === user.email;
  });

  if (userWithSameEmail) return null;

  users.push({ ...user, id: userId });

  return {
    id: userId,
    ...user,
  };
};

export const getMoviesSortedByRelevance = async () => {
  await delay(MOCKED_BACKEND_TIMEOUT_IN_MS);
  const moviesSortedByRelevance = [...movies];

  shuffleItems(moviesSortedByRelevance);

  return moviesSortedByRelevance;
};

export const generateLolomoFromMovies = async ({
  movies,
  search,
}: {
  movies: TMovie[];
  search?: string;
}) => {
  await delay(MOCKED_BACKEND_TIMEOUT_IN_MS);

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

  return ["", ...categories].map((category) => {
    return [
      category || "For You",
      filteredMovies.filter((movie) => {
        const isForYou = !category;
        if (isForYou) return true;
        const doesGenreIncludes = movie.genres.includes(category);
        if (doesGenreIncludes) return true;
        return false;
      }),
    ] as const;
  });
};

const methods = {
  generateLolomoFromMovies,
};

self.onmessage = async (m) => {
  if (m.data.source !== "khepex") return;

  const method = methods[m.data.method as keyof typeof methods];
  const result = await method(m.data.payload);

  self.postMessage({ source: "khepex", result });
};
