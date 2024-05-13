import { TUser } from "../types";

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
