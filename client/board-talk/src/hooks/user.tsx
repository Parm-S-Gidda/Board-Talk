import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Must be within provider");
  }

  return userContext;
};
