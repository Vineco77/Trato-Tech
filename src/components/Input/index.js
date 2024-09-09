import { forwardRef } from "react";
import styles from "./Input.module.scss";

function Input({ value, onChange, ...otherProps }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      {...otherProps}
      className={styles.input}
    />
  );
}

export default forwardRef(Input);
