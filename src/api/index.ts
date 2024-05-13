import { users } from "../__mock__";
import { TUser } from "../types";
import { delay } from "../utils";

export const getCurrentUser = async (): Promise<TUser | null> => {
  await delay(1000);
  const currentUserId = localStorage.getItem("currentUserId");
  if (currentUserId) {
    const user = users.find((user) => user.id === currentUserId);
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
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
  await delay(1000);
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });

  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  return null;
};

export const signUpUser = async (
  user: Omit<TUser & { password: string }, "id">,
): Promise<TUser | null> => {
  await delay(1000);
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
