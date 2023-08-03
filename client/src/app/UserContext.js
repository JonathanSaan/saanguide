"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userString = Cookies.get("user");
  const [isLoggedIn, setIsLoggedIn] = useState(userString ? JSON.parse(userString) : false);
  
  const isCommentOwner = (comment) => {
    return isLoggedIn && isLoggedIn.username === comment.username;
  }
  
  useEffect(() => {
    const user = typeof userString !== "undefined" ? JSON.parse(userString) : null;
    setIsLoggedIn(user);
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isCommentOwner }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
