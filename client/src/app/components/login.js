"use client";

import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import PostLogin from "../api/postLogin";
import useFormErrorMessage from "../utils/useFormErrorMessage";
import { UserContext } from "../UserContext";
import errorMessages from "../utils/errorMessages";
import styles from "../styles/form.module.scss";

const Login = ({ handleFormClick, handleRemoveBackgroundClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { setIsLoggedIn } = useContext(UserContext);
  
  const [accountNotFound, setAccountNotFound] = useState("");

  const onSubmit = async (data) => {
    document.body.style.cursor = "wait";
    const response = await PostLogin(data);

    if (response.error) {
      document.body.style.cursor = "default";
      return setAccountNotFound(response.message);
    }

    const { token, user } = response;

    setAccountNotFound("");
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
    setIsLoggedIn("user", JSON.stringify(user));
    handleRemoveBackgroundClick();
    document.body.style.cursor = "default";
  };

  return (
    <dialog open className={styles.container}>
      <h1 className={styles.containerTitle}>Login</h1>
      <form className={styles.container_form} onSubmit={handleSubmit(onSubmit)}>
        {accountNotFound && (
          <p
            className={`${styles.container_formErrorMessage} ${styles.accountNotFound}`}
          >
            {accountNotFound}
          </p>
        )}
        <input
          className={styles.container_formInput}
          type="email"
          placeholder="Email"
          {...register("email", {
            required: errorMessages.email.required,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: errorMessages.email.pattern,
            },
          })}
        />
        {useFormErrorMessage(errors, "email")}

        <input
          className={styles.container_formInput}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: errorMessages.password.required,
            minLength: {
              value: 8,
              message: errorMessages.password.minLength,
            },
          })}
        />
        {useFormErrorMessage(errors, "password")}

        <button className={styles.container_formButton}>Login</button>
      </form>

      <p className={styles.containerText}>
        Don't have an account?
        <span
          className={styles.containerTextLink}
          onClick={() => handleFormClick("register")}
        >
          {" "}
          Register
        </span>
      </p>
    </dialog>
  );
};

export default Login;
