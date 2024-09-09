import Button from "components/Button";
import Header from "components/Header";
import Item from "components/Item";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadingOneCategory } from "store/reducers/categories";
import styles from "./Category.module.scss";

export default function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const { category, items } = useSelector((state) => {
    const regexp = new RegExp(state.search, "i");
    return {
      category:
        state.categories.find((category) => category.id === categoryName) || {},
      items: state.items.filter(
        (item) => item.category === categoryName && item.title.match(regexp)
      ),
    };
  });

  useEffect(() => {
    dispatch(loadingOneCategory(categoryName));
  }, [dispatch, categoryName]);

  return (
    <div>
      <Header
        title={category.name}
        description={category.description}
        image={category.header}
      >
        <Button onClick={() => navigate(`/advertise/${categoryName}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.items}>
        {items?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
