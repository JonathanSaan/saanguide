"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

const UserProvider = React.memo(({ children }) => {
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
  }, [userString]);

  const contextValue = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
    showConsent,
    setShowConsent
  }), [isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, showConsent, setShowConsent]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
});

export { UserContext, UserProvider };
