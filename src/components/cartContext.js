import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.firebaseKey !== id)); // THis is used to remove one item from the cart
  }

  // Memoize the context value to avoid unnecessary re-render, this will allow us to call these items in the future when exporting.
  const contextValue = useMemo(() => ({ cartItems, addToCart, setCartItems, removeFromCart }), [cartItems]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

function useCart() {
  return useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartProvider, useCart };
