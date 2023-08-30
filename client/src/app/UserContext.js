"use client"

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import Loading from "./loading";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userString = Cookies.get("user");
  const [showConsent, setShowConsent] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState();
  
  useEffect(() => {
    const user = typeof userString !== "undefined" ? JSON.parse(userString) : null;
    setIsLoggedIn(user);

    if (user && user.isAdmin !== undefined) {
      setIsAdmin(user.isAdmin);
    }
    
    const cookieConsent = Cookies.get("showConsent");
    setShowConsent(cookieConsent !== "false");
    
    if (typeof window === "undefined") {
      return <Loading />;
    }
  }, [userString]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, showConsent, setShowConsent }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
