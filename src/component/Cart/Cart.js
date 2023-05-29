import React, { useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import CheckOut from "../CheckOut/CheckOut";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart(props) {
  const [checkedOut, setCheckedOut] = useState(false);
  const [iscartItem, setIsCartItem] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // show or not show - the check out modal
  function orderHandler() {
    setIsCartItem(false);
    setCheckedOut(true);
  }
  function onAdd(item) {
    cartCtx.addItem({...item , amount : 1})
  }
  function onRemove(id) {
    cartCtx.removeItem(id)
  }

  //Post req to the backend
  async function onOrderConfirm(userData) {
    setIsSubmit(true);
    await fetch(
      "https://majd-project-305719-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderdItems: cartCtx.items,
        }),
      }
    );
    setDidSubmit(true);
    setIsSubmit(false);
    cartCtx.clearCart();
  }

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={onRemove.bind(null, item.id)}
            onAdd={onAdd.bind(null,item)}
          />
        );
      })}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt "]}
        onClick={props.hideCartHandler}
      >
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const modalContent = (
    <React.Fragment>
      {iscartItem && CartItems}
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>{totalAmount} </span>
      </div>
      {checkedOut && (
        <CheckOut
          hideCartHandler={props.hideCartHandler}
          onOrderConfirm={onOrderConfirm}
        />
      )}
      {!checkedOut && modalActions}
    </React.Fragment>
  );

  const isSubmitModal = <p>Sending Order Data ...</p>;
  const didSubmitModal = (
    <React.Fragment>
      <p>
        Successfully sent the order , you will be contacted once we're done
        preparing your order
      </p>
      <div className={classes.actions}>
      <button
        className={classes.button}
        onClick={props.hideCartHandler}
      >
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {!isSubmit && !didSubmit && modalContent}
      {isSubmit && isSubmitModal}
      {!isSubmit && didSubmit && didSubmitModal}
    </Modal>
  );
}
