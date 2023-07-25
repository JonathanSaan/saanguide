"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "./loading";

const CheckCookie = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = Cookies.get("user");
    const user = typeof userString !== "undefined" ? JSON.parse(userString) : false;

    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default CheckCookie;