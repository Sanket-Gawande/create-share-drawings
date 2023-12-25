import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
const UserCTX = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_project_28")));
  }, []);

  return (
    <UserCTX.Provider value={{ user, setUser }}>{children}</UserCTX.Provider>
  );
};

export default UserCTX;
