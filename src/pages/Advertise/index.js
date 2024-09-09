import Button from "components/Button";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Advertise.module.scss";
import { useForm } from "react-hook-form";
import { registerItem } from "store/reducers/items";
import { useParams } from "react-router-dom";
import Input from "components/Input";
import { useEffect } from "react";
import {
  loadingCategories,
  loadingOneCategory,
} from "store/reducers/categories";

export default function Advertise() {
  const dispatch = useDispatch();
  const { categoryName = "" } = useParams();
  const categories = useSelector((state) =>
    state.categories.map(({ name, id }) => ({ name, id }))
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      category: categoryName,
    },
  });

  function toRegister(data) {
    dispatch(registerItem(data));
  }

  useEffect(() => {
    dispatch(
      categoryName ? loadingOneCategory(categoryName) : loadingCategories
    );
  }, [dispatch, categoryName]);

  return (
    <div className={styles.container}>
      <Header
        title="Anuncie aqui!"
        description="Anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.form} onSubmit={handleSubmit(toRegister)}>
        <Input
          {...register("title", { required: true })}
          placeholder="Nome do produto"
          alt="Nome do produto"
        />
        <Input
          {...register("description", { required: true })}
          placeholder="Descrição do produto"
          alt="Descrição do produto"
        />
        <Input
          {...register("image", { required: true })}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        <select
          {...register("category", { required: true })}
          disabled={categoryName}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Input
          {...register("price", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Preço do produto"
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
