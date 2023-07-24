"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

const CheckLocalStorage = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

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

export default CheckLocalStorage;