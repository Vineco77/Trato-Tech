import Header from "components/Header";
import styles from "./Payment.module.scss";
import Select from "components/Select";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishPayment, loadingPayment } from "store/reducers/cart";

export default function Payment() {
  const [paymentType, setPaymentType] = useState("-");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const total = useSelector((state) => state.cart.total);
  const totalValue = paymentType === "-" ? total : total * paymentType.tax;

  function changePaymentType(event) {
    if (event.target.value === "-") return setPaymentType("-");

    setPaymentType(user.cards.find((card) => card.id === event.target.value));
  }

  function finish() {
    dispatch(finishPayment({ totalValue, paymentType }));
  }

  useEffect(() => {
    dispatch(loadingPayment);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header title="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          {" "}
          Olá {user.name}! Escolha a forma de pagamento:
        </p>
        <Select
          value={paymentType.id}
          onChange={changePaymentType}
          placeholder="Forma de pagamento"
          alt="Forma de pagamento"
        >
          <option value="-">Forma de pagamento</option>
          {user.cards?.map((card) => (
            <option key={card.id} value={card.id}>
              {card.name}
            </option>
          ))}
        </Select>
        <div className={styles.content}>
          {paymentType !== "-" && (
            <>
              <p>
                A forma de pagamento {paymentType.name} tem taxa de{" "}
                {paymentType.tax}x
              </p>
              <p>
                O saldo deste cartão é de R$ {paymentType.balance.toFixed(2)}
              </p>
            </>
          )}
          <p> Total com taxas: R$ {totalValue.toFixed(2)}</p>
        </div>
        <div className={styles.finalizar}>
          <Button
            disabled={totalValue === 0 || paymentType === "-"}
            onClick={finish}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
