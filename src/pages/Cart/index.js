import Header from "components/Header";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import Items from "components/Item";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, total } = useSelector((state) => {
    const regexp = new RegExp(state.search, "i");

    const cartReduce = state.cart.data.reduce((items, itemInTheCart) => {
      const item = state.items.find((item) => item.id === itemInTheCart.id);
      if (item.title.match(regexp)) {
        items.push({
          ...item,
          amount: itemInTheCart.amount,
        });
      }
      return items;
    }, []);
    return {
      cart: cartReduce,
      total: state.cart.total,
    };
  });

  return (
    <div>
      <Header
        title="Carrinho de compras"
        description="Confira produtos que você adicionou ao carrinho"
      />
      <div className={styles.cart}>
        {cart.map((item) => (
          <Items key={item.id} {...item} cart />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>
        <Button onClick={() => navigate("/payment")}>Finalizar compra</Button>
      </div>
    </div>
  );
}
