import {useContext, useState} from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        setIsCheckout(true);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const submitOrderHandler = (userData) => {
        fetch('https://react-prep-b4fd7-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body:JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
    }

    //we want to map all cartItems to cartItem.jsx elements
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item.item)}
                />
            ))}
        </ul>
    );

    const orderHander = () => {
        setIsCheckout(true);
    }

    const modelActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {hasItems && <button className={classes.button} onClick={orderHander}>Order</button>}
        </div>
    )

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modelActions}
        </Modal>
    );
};

export default Cart;
//template literal ``