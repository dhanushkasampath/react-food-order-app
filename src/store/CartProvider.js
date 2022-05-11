//the goal of this component is simply to manage the cart context data and provide that data to all components that want access to it.
import CartContext from "./cart-context";

//we are going to manage complex states using useReducer
import {useReducer} from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

//we have two kinds of actions which trigger this reducer
//concat() gives a brand new array instead of editing existing one
const cartReducer = (state, action) => {
  if(action.type === 'ADD'){
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    //return the new state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  //useReducer retrun an array with exactly two elements
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  //we need to make sure this 'addItemToCartHandler' is called from some component(meals component) with appropriate
  // data(i.e. id/name/price/amount)
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type:'ADD', item:item});
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({type:'REMOVE', id:id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//props.children<- with this, it allows us to wrap any component that should get access to context with this "CartProvider" component.
//So that all contain in one component. other components do not want to deal with that.
