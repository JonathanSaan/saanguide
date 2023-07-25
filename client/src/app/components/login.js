"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import PostLogin from "../api/postLogin";
import useFormErrorMessage from "../utils/useFormErrorMessage";
import errorMessages from "../utils/errorMessages";
import styles from "../styles/form.module.scss";

const Login = ({ setUser, handleFormClick, handleRemoveBackgroundClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [accountNotFound, setAccountNotFound] = useState("");

  const onSubmit = async (data) => {
    const response = await PostLogin(data);

    if (response.error) {
      return setAccountNotFound(response.message);
    }

    const { token, user } = response;

    setAccountNotFound("");
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    setUser(user);
    handleRemoveBackgroundClick();
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Login;
