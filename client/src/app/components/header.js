"use client";

import Link from "next/link";
import { useState } from "react";

import Cookies from "js-cookie";

import Login from "./login";
import Register from "./register";
import styles from "../styles/header.module.scss";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [headerLowZIndex, setHeaderLowZIndex] = useState(false);

  const initialUser = Cookies.get("user");
  const [user, setUser] = useState(initialUser ? JSON.parse(initialUser) : false);

  const handleSignOut = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(false);
  };
  
  const handleFormClick = (type) => {
    setShowBackground(true);
    setMenuActive(false);
    setHeaderLowZIndex(true);

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
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    setShowBackground(!menuActive);
    setHeaderLowZIndex(menuActive);
  };

  return (
    <>
      <header className={`${styles.header} ${headerLowZIndex ? styles.headerLowZIndex : ""}`}>
        <Link className={styles.headerLogo} href="/">
          Saan's Guidebook
        </Link>
        <ul className={`${styles.header_menu} ${menuActive ? styles.active : ""}`}>
          {user ? (
            <>
              <li className={styles.header_menuItem}>
                <Link href="/">Create Post</Link>
              </li>
              <li className={styles.header_menuItem} onClick={handleSignOut}>
                <Link href="/">Leave</Link>
              </li>
            </>
          ) : (
            <>
              <li
                className={styles.header_menuItem}
                onClick={() => handleFormClick("login")}
              >
                <h3>Login</h3>
              </li>
              <li
                className={styles.header_menuItem}
                onClick={() => handleFormClick("register")}
              >
                <h3>Register</h3>
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
          setUser={setUser}
          handleFormClick={handleFormClick}
          handleRemoveBackgroundClick={handleRemoveBackgroundClick}
        />
      )}
      {showRegister && (
        <Register
          setUser={setUser}
          handleFormClick={handleFormClick} 
          handleRemoveBackgroundClick={handleRemoveBackgroundClick} 
        />
      )}
    </>
  );
};

export default Header;
