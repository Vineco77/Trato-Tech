import styles from "./Footer.module.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const propsIcon = {
  color: "white",
  size: 24,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <FaFacebook {...propsIcon} />
        <FaTwitter {...propsIcon} />
        <FaInstagram {...propsIcon} />
        <span>Desenvolvido por Vinicius Ribeiro.</span>
      </div>
    </footer>
  );
}
