import styles from "./Button.module.scss";

export default function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {children}
    </button>
  );
}
