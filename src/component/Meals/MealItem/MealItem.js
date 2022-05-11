import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

//in the MealItem component I want access to my context
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);// pass CartContext to useContext to establish the connection
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
      cartCtx.addItem({
          id:props.id,
          name: props.name,
          amount: amount,
          price: props.price
      });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
