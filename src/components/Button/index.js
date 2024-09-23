import styles from "./Button.module.scss";

export default function Button({ disabled, children, type, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={styles.button}
    >
      {children}
    </button>
  );
}
