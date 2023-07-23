"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import postRegister from "../api/postRegister";
import useFormErrorMessage from "../utils/useFormErrorMessage";
import errorMessages from "../utils/errorMessages";
import { setItem } from "../utils/cookie";
import styles from "../styles/form.module.scss";

const Register = ({
  setUserLoggedIn,
  handleFormClick,
  handleRemoveBackgroundClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [usernameRegistered, setUsernameRegistered] = useState("");
  const [emailRegistered, setEmailRegistered] = useState("");

  const onSubmit = async (data) => {
    const response = await postRegister(data);
    setUsernameRegistered("");
    setEmailRegistered("");

    if (response.status === 403 && response.usernameRegistered) {
      setUsernameRegistered(response.message);
    }
  
    if (response.status === 403 && response.emailRegistered) {
      setEmailRegistered(response.message);
    }

    const { token, user } = response;

    if (token, user) {
      setItem({ token, user });
      setUserLoggedIn(user);
      handleRemoveBackgroundClick();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>Register</h1>
      <form className={styles.container_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.container_formInput}
          type="text"
          placeholder="Username"
          {...register("username", {
            required: errorMessages.username.required,
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: errorMessages.username.pattern,
            },
            minLength: {
              value: 4,
              message: errorMessages.username.minLength,
            },
          })}
        />
        {usernameRegistered && (
          <p className={styles.container_formErrorMessage}>
            {usernameRegistered}
          </p>
        )}
        {useFormErrorMessage(errors, "username")}

        <input
          className={styles.container_formInput}
          type="email"
          placeholder="Email"
          {...register("email", {
            required: errorMessages.email.required,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          })}
        />
        {emailRegistered && (
          <p className={styles.container_formErrorMessage}>
            {emailRegistered}
          </p>
        )}
        {useFormErrorMessage(errors, "email")}

        <input
          className={styles.container_formInput}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: errorMessages.password.required,
            pattern: {
              value: /[!@#$%^&*(),.?":{}|<>]/,
              message: errorMessages.password.pattern,
            },
            minLength: {
              value: 8,
              message: errorMessages.password.minLength,
            },
            validate: (value) => errorMessages.password.validate(value),
          })}
        />
        {useFormErrorMessage(errors, "password")}

        <input
          className={styles.container_formInput}
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword", {
            required: errorMessages.repeatPassword.required,
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
        />
        {useFormErrorMessage(errors, "repeatPassword")}

        <button className={styles.container_formButton}>register</button>
      </form>

      <p className={styles.containerText}>
        Already have an account?
        <span
          className={styles.containerTextLink}
          onClick={() => handleFormClick("login")}
        > Login
        </span>
      </p>
    </div>
  );
};

export default Register;
