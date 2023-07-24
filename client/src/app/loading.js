import ClipLoader from "react-spinners/ClipLoader";
import styles from "./styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <ClipLoader color="#0075ea" size={100} />
    </div>
  );
}

export default Loading;
