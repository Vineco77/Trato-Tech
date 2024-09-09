import relogio from "assets/inicial.png";
import Button from "components/Button";
import Header from "components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadingCategories } from "store/reducers/categories";
import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(loadingCategories());
  }, [dispatch]);

  return (
    <div>
      <Header
        title="Classificados Tech"
        description="Compre diversos tipos de produtos no melhor site do Brasil!"
        image={relogio}
        className={styles.header}
      >
        <Button onClick={() => navigate("/advertise")}>Quero anunciar</Button>
      </Header>
      <div className={styles.categories}>
        <div className={styles["categories-title"]}>
          <h1>Categorias</h1>
        </div>
        <div className={styles["categories-container"]}>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <img src={category.thumbnail} alt={category.name} />
              <h1>{category.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
