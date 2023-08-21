"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";

import Cookies from "js-cookie";
import { Analytics } from "@vercel/analytics/react";

import Login from "./login";
import { UserContext } from "../UserContext";
import Register from "./register";
import styles from "../styles/header.module.scss";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [headerLowZIndex, setHeaderLowZIndex] = useState(false);
  
  const handleSignOut = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setIsLoggedIn(null);
    setIsAdmin(null);
  };
  
  const handleFormClick = (type) => {
    setShowBackground(true);
    setMenuActive(false);
    setHeaderLowZIndex(true);
    document.body.style.overflow = "hidden";
    
    if (type === "login") {
      setShowLogin(!showLogin);
      setShowRegister(false);
    }

    if (type === "register") {
      setShowRegister(!showRegister);
      setShowLogin(false);
    }
  };

  const handleRemoveBackgroundClick = () => {
    setShowBackground(false);
    setShowLogin(false);
    setShowRegister(false);
    setMenuActive(false);
    setHeaderLowZIndex(false);
    document.body.style.overflow = "auto";
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflow = "hidden";
    setShowBackground(!menuActive);
    setHeaderLowZIndex(menuActive);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleRemoveBackgroundClick);
    
    return () => {
      window.removeEventListener("resize", handleRemoveBackgroundClick);
    };
  }, []);
  
  return (
    <>
      <header className={`${styles.header} ${headerLowZIndex ? styles.headerLowZIndex : ""}`}>
        <Link className={styles.headerLogo} href="/">
          Saan's Guidebook
        </Link>
        <ul className={`${styles.header_menu} ${menuActive ? styles.active : ""}`}>
          {isAdmin && (
            <li className={styles.header_menuItem}>
              <Link href="/publish">Publish</Link>
            </li>
          )}
          {isLoggedIn ? (
            <li className={styles.header_menuItem} onClick={handleSignOut}>
              <Link href="/">Leave</Link>
            </li>
          ) : (
            <>
              <li className={styles.header_menuItem} onClick={() => handleFormClick("login")}>
                Login
              </li>
              <li className={styles.header_menuItem} onClick={() => handleFormClick("register")}>
                Register
              </li>
            </>
          )}
        </ul>

        <div
          className={`${styles.header_hamburger} ${menuActive ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.header_hamburgerBar}></span>
          <span className={styles.header_hamburgerBar}></span>
          <span className={styles.header_hamburgerBar}></span>
        </div>
      </header>

      {showBackground && (
        <div
          className={styles.background}
          onClick={handleRemoveBackgroundClick}
        ></div>
      )}

      {showLogin && (
        <Login
          handleFormClick={handleFormClick}
          handleRemoveBackgroundClick={handleRemoveBackgroundClick}
        />
      )}
      {showRegister && (
        <Register
          handleFormClick={handleFormClick} 
          handleRemoveBackgroundClick={handleRemoveBackgroundClick} 
        />
      )}
      <Analytics debug={false} />
    </>
  );
};

export default Header;
