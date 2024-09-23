import styles from "./Item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, changeAmount } from "store/reducers/cart";
import { changeItem, toggleFavorite, deleteItem } from "store/reducers/items";
import classNames from "classnames";
import { memo, useState } from "react";
import Input from "components/Input";

const propsIcon = {
  size: 24,
  color: "#041833",
};

const amountProps = {
  size: 32,
  color: "#1875E8",
};

function Items(props) {
  const { title, image, price, description, favorite, id, cart, amount } =
    props;

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();

  const isInTheCart = useSelector((state) =>
    state.cart.data?.some((itemInTheCart) => itemInTheCart.id === id)
  );

  function manageFavorite() {
    dispatch(toggleFavorite(id));
  }

  function manageCart() {
    dispatch(toggleCart(id));
  }

  const editModeComponent = (
    <>
      {editMode ? (
        <AiOutlineCheck
          {...propsIcon}
          className={styles["item-action"]}
          onClick={() => {
            setEditMode(false);
            dispatch(
              changeItem({
                id,
                item: { title: newTitle },
              })
            );
          }}
        />
      ) : (
        <AiFillEdit
          {...propsIcon}
          className={styles["item-action"]}
          onClick={() => setEditMode(true)}
        />
      )}
    </>
  );

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemInTheCart]: cart,
      })}
    >
      <AiFillCloseCircle
        onClick={() => dispatch(deleteItem(id))}
        {...propsIcon}
        className={`${styles["item-action"]} ${styles["item-delete"]}`}
      />
      <div className={styles["item-image"]}>
        <img src={image} alt={title} />
      </div>
      <div className={styles["item-description"]}>
        <div className={styles["item-title"]}>
          {editMode ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <h2>{title}</h2>
          )}
          <p>{description}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-price"]}>R$ {price.toFixed(2)}</div>
          <div className={styles["item-actions"]}>
            {favorite ? (
              <AiFillHeart
                {...propsIcon}
                color="#ff0000"
                className={styles["item-action"]}
                onClick={manageFavorite}
              />
            ) : (
              <AiOutlineHeart
                {...propsIcon}
                className={styles["item-action"]}
                onClick={manageFavorite}
              />
            )}
            {cart ? (
              <div className={styles.amount}>
                Quantidade:
                <AiFillMinusCircle
                  {...amountProps}
                  onClick={() => {
                    if (amount >= 1) {
                      dispatch(changeAmount({ id, amount: -1 }));
                    }
                  }}
                />
                <span>{String(amount || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  {...amountProps}
                  onClick={() => dispatch(changeAmount({ id, amount: +1 }))}
                />
              </div>
            ) : (
              <>
                <FaCartPlus
                  {...propsIcon}
                  color={isInTheCart ? "#1875E8" : propsIcon.color}
                  className={styles["item-action"]}
                  onClick={manageCart}
                />
                {editModeComponent}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Items);
