import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './CheckOut';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false)
  const [didSubmitted , setDidSubmitted] = useState(false)
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch('https://httpreq-2aed1-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = <React.Fragment>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
  </React.Fragment>

  const style = {
    color : 'green'
  }

  const isSubmittingModalContent = <p>Sending Order data...</p>
  const didSubmittedModalContent = 
  <React.Fragment>
    <p style={style}>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmitted &&cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting &&didSubmitted && didSubmittedModalContent}

    </Modal>
  );
};

export default Cart;