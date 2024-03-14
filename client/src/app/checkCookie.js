"use client";

import { useContext, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { UserContext } from "./UserContext";
import Loading from "./loading";

const CheckCookie = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  
  useEffect(() => {
    const userString = Cookies.get("user");
    const user = typeof userString !== "undefined" ? JSON.parse(userString) : false;
    setIsLoggedIn(user);
    setLoading(false);
  }, [setIsLoggedIn]);
  
  const memoizedChildren = useMemo(() => children, [children]);

  if (loading) {
    return <Loading />;
  }

  return memoizedChildren;
};

export default CheckCookie;
