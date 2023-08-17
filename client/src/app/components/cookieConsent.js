"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

import Cookies from "js-cookie";

import styles from "../styles/cookieConsent.module.scss";

const CookieConsent = () => {
  const { showConsent, setShowConsent } = useContext(UserContext);

  const acceptCookie = () => {
    setShowConsent(false);
    Cookies.set("showConsent", false, { expires: 365 });
  };

  return (
    <>
      {showConsent && (
        <div className={styles.container}>
          <p>This website uses cookies.</p>
          <button className={styles.containerButton} onClick={acceptCookie}>
            <label>Ok</label>
          </button>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
