"use client";

import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { CircularProgress } from "react-cssfx-loading";
import Cookies from "js-cookie";

import postRegister from "../api/postRegister";
import useFormErrorMessage from "../utils/useFormErrorMessage";
import { UserContext } from "../UserContext";
import errorMessages from "../utils/errorMessages";
import styles from "../styles/form.module.scss";

const Register = ({ handleFormClick, handleRemoveBackgroundClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const { setIsLoggedIn } = useContext(UserContext);
  
  const [usernameRegistered, setUsernameRegistered] = useState("");
  const [emailRegistered, setEmailRegistered] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await postRegister(data);
    setUsernameRegistered("");
    setEmailRegistered("");

    if (response.status === 403 && response.usernameRegistered) {
      setLoading(false);
      setUsernameRegistered(response.message);
    }
  
    if (response.status === 403 && response.emailRegistered) {
      setLoading(false);
      setEmailRegistered(response.message);
    }

    const { token, user } = response;

    if (token, user) {
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
      setIsLoggedIn("user", JSON.stringify(user));
      handleRemoveBackgroundClick();
      setLoading(false);
    }
  };

  return (
    <dialog open className={styles.container}>
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
            maxLength: {
              value: 50,
              message: errorMessages.username.maxLength,
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

        <button disabled={loading} className={styles.container_formButton}>
          {loading ? <CircularProgress color={"#fafaf9"} height="2em" width="2em" /> : "register"}
        </button>
      </form>

      <p className={styles.containerText}>
        Already have an account?
        <span
          className={styles.containerTextLink}
          onClick={() => handleFormClick("login")}
        > Login
        </span>
      </p>
    </dialog>
  );
};

export default Register;
