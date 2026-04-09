import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <userContext.Provider
      value={{ token, setToken, userId, setUserId, role, setRole }}
    >
      {children}
    </userContext.Provider>
  );
};