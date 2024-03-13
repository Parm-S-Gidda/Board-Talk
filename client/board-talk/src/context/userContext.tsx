import { createContext, useState } from "react";

type User = {
  email: string;
  name: string;
  user_id: string;
  createdAt: string;
};

type UserContext = {
  user: User;
  updateUser: (user: User) => void;
};

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    createdAt: "",
    user_id: "",
  });

  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
