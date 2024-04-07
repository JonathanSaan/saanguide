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
    const cookieConsent = Cookies.get("showConsent");
    
    setIsLoggedIn(user);
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
