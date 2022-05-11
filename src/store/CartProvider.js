//the goal of this component is simply to manage the cart context data and provide that data to all components that want access to it.
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {};

  const removeItemToCartHandler = (id) => {};

  const CartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={CartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//props.children<- with this, it allows us to wrap any component that should get access to context with this "CartProvider" component.
//So that all contain in one component. other components do not want to deal with that.
