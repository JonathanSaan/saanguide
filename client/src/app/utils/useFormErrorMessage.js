import { ErrorMessage } from "@hookform/error-message";

import styles from "../styles/form.module.scss";

const useFormErrorMessage = (errors, name) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className={styles.container_formErrorMessage}>{message}</p>
      )}
    />
  );
};

export default useFormErrorMessage;