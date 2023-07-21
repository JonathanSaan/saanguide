const errorMessages = {
  username: {
    required: "Username is required.",
    pattern:
      "Username can only contain letters, numbers, underscores, and hyphens.",
    minLength: "Username must have at least 4 characters.",
  },
  email: {
    required: "Email is required.",
  },
  password: {
    required: "Password is required.",
    pattern: "The password must contain at least one special character.",
    minLength: "Passwords must have at least 8 characters.",
    specialChars: "The password must contain at least one special character.",
    validate: (value) => {
      const minLengthRegex = /^.{8,}$/;
      const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const hasMinLength = minLengthRegex.test(value);
      const hasSpecialChars = specialCharsRegex.test(value);

      if (!hasMinLength || !hasSpecialChars) {
        if (!hasMinLength && !hasSpecialChars) {
          return "Passwords must have at least 8 characters and contain at least one special character.";
        }
        if (!hasMinLength) {
          return "Passwords must have at least 8 characters.";
        }
        return "The password must contain at least one special character.";
      }

      return true;
    },
  },
  repeatPassword: {
    required: "Repeat password is required.",
  },
};

export default errorMessages;
