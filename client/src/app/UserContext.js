"use client"

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userString = Cookies.get("user");
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const user = typeof userString !== "undefined" ? JSON.parse(userString) : null;
    setIsLoggedIn(user);

    if (user && user.isAdmin !== undefined) {
      setIsAdmin(user.isAdmin);
    }
  }, [userString]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
