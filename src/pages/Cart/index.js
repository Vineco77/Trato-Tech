import Header from "components/Header";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Items from "components/Item";
import { resetCart } from "store/reducers/cart";
import Button from "components/Button";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => {
    let total = 0;
    const regexp = new RegExp(state.search, "i");

    const cartReduce = state.cart.reduce((items, itemInTheCart) => {
      const item = state.items.find((item) => item.id === itemInTheCart.id);
      total += item.price * itemInTheCart.amount;
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
      total: total,
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
        <Button onClick={() => dispatch(resetCart())}>Finalizar compra</Button>
      </div>
    </div>
  );
}
